# -*- coding: UTF-8 -*-
import sys
import csv
import json
import time
from elasticsearch import Elasticsearch
from filter_rules import filter_activity, filter_ip, filter_retweet_count, filter_mention
reload(sys)
sys.path.append('../../')
from global_utils import R_CLUSTER_FLOW2,  R_DICT, ES_DAILY_RANK, es_user_portrait, R_CLUSTER_FLOW3, R_SENSITIVE_REDIS as r_sensitive
# from global_utils import ES_DAILY_RANK, es_user_portrait
from global_config import portrait_name, portrait_type, peo_list, org_list
from global_utils import R_RECOMMENTATION as r
from global_utils import portrait_index_name, portrait_index_type
from global_utils import es_user_profile, profile_index_name, profile_index_type
from parameter import RECOMMENTATION_TOPK as k
from time_utils import datetime2ts, ts2datetime, ts2date
from parameter import DAY, RUN_TYPE, RUN_TEST_TIME
from parameter import RECOMMEND_IN_SENSITIVE_TOP, RECOMMEND_IN_BLACK_USER1, RECOMMEND_IN_BLACK_USER2

def search_from_es(date):
    index_time = 'bci_' + ''.join(date.split('-'))
    index_type = 'bci'
    query_body = {
        'query':{
            'match_all':{}
            },
        'size':k,
        'sort':[{'user_index':{'order':'desc'}}]
        }
    try:
        result = ES_DAILY_RANK.search(index=index_time, doc_type=index_type, body=query_body)['hits']['hits']
    except:
        print 'cron/recommend_in/recommend_in.py&error-1&'
        return set([]), []
    user_set = []
    user_set = [user_dict['_id'] for user_dict in result]
    return set(user_set), result

def filter_in(top_user_set):
    results = []
    try:
        in_results = es_user_portrait.mget(index=portrait_index_name, doc_type=portrait_index_type, body={'ids':list(top_user_set)})
    except Exception as e:
        print 'cron/recommend_in/recommend_in.py&error-2&'

    filter_list = [item['_id'] for item in in_results['docs'] if item['found'] is True]
    results = set(top_user_set) - set(filter_list)
    return results

def filter_rules(candidate_results):
    results = []
    #rule1: activity count
    filter_result1 = filter_activity(candidate_results)
    #rule2: ip count
    filter_result2 = filter_ip(filter_result1)
    #rule3: retweet count & beretweeted count
    filter_result3 = filter_retweet_count(filter_result2)
    #rule4: mention count
    results = filter_mention(filter_result3)
    return results


def write_recommentation(date, results, user_dict):
    f = open('/home/user_portrait_0320/revised_user_prtrait/user_portrait/user_portrait/cron/recommentation_in/recommentation_list_'+date+'.csv', 'wb')
    writer = csv.writer(f)
    status = False
    for item in results:
        writer.writerow([item])
    return True

def save_recommentation2redis(date, user_set):
    hash_name = 'recomment_'+str(date)
    status = 0
    for uid in user_set:
        r.hset(hash_name, uid, status)
    return True


def read_black_user():
    results = set()
    f = open(RECOMMEND_IN_BLACK_USER1, 'rb')
    reader = csv.reader(f)
    for line in reader:
        uid = line[0]
        results.add(uid)
    f.close()
    f = open(RECOMMEND_IN_BLACK_USER2, 'rb')
    for line in f:
        uid = line.split('\r')[0]
        if len(uid)==13:
            uid = uid[3:13]
        results.add(uid)
    f.close()
    return results

# get sensitive user and filt in
def get_sensitive_user(date):
    results = set()
    r_cluster = R_CLUSTER_FLOW3 # cluster 3333333333333333333
    ts = datetime2ts(date)
    results = r_sensitive.hgetall('sensitive_'+str(ts))
    if results:
        results = sorted(results.iteritems(), key=lambda t:t[1], reverse=True)
        user_list = [result[0] for result in results[0:RECOMMEND_IN_SENSITIVE_TOP]]
    else:
        return []
    results = filter_in(user_list)
    return results

def search_user_type(uid_list):
    type_list = es_user_profile.mget(index=profile_index_name, doc_type=profile_index_type, \
                body={'ids': uid_list},_source=False, fields=['id', 'verified_type'])['docs']
    user_list = []
    org_list1 = []
    for i in type_list:
        if i['found'] == False:
            user_list.append(i['_id'])
        else:
            # print i
            if not i['fields'].has_key('verified_type'):
                user_list.append(i['_id'])
                continue
            verified_type = i['fields']['verified_type'][0]
            if verified_type in org_list:
                org_list1.append(i['_id'])
            else:
                user_list.append(i['_id'])
    return user_list,org_list1


def main():
    #run_type
    if RUN_TYPE == 1:
        now_ts = time.time()
    else:
        now_ts = datetime2ts(RUN_TEST_TIME)
    date = ts2datetime(now_ts - DAY)
    print date
    # auto recommendation: step 1:4
    #step1: read from top es_daily_rank
    top_user_set, user_dict = search_from_es(date)
    #step2: filter black_uid
    black_user_set = read_black_user()
    subtract_user_set = top_user_set - black_user_set
    #step3: filter users have been in
    subtract_user_set = list(subtract_user_set)
    candidate_results = filter_in(subtract_user_set)
    #step4: filter rules about ip count& reposts/bereposts count&activity count
    results = filter_rules(candidate_results)
    new_date = ts2datetime(now_ts)
    # print new_date,'00000000000000'
    hashname_influence_u = "recomment_" + new_date + "_influence_user"
    hashname_influence_o = "recomment_" + new_date + "_influence_org"
    if results:
        user_list, org_list = search_user_type(results)
        if user_list:
            for uid in user_list:
                # print uid
                r.hset(hashname_influence_u, uid, "0")
        if org_list:
            for oid in org_list:
                # print oid
                r.hset(hashname_influence_o, oid, "0")
    #step5: get sensitive user
    print date,'date'
    sensitive_user = list(get_sensitive_user(date))
    hashname_sensitive_u = "recomment_" + new_date + "_sensitive_user"
    hashname_sensitive_o = "recomment_" + new_date + "_sensitive_org"
    if sensitive_user:
        # print sensitive_user,'!!!!!'
        s_user_list, s_org_list = search_user_type(sensitive_user)
        if s_user_list:
            for uid in s_user_list:
                # print uid, 'sensitive_user'
                r.hset(hashname_sensitive_u, uid, "0")
        if s_org_list:
            for oid in s_org_list:
                # print oid, 'sensitive_org'
                r.hset(hashname_sensitive_o, oid, "0")

        # for uid in sensitive_user:
        #     print uid, hashname_sensitive
        #     r.hset(hashname_sensitive, uid, "0")

    results.extend(sensitive_user)
    results = set(results)
    # step6: write to recommentation csv/redis ++for super admin
    hashname_submit = "submit_recomment_" + new_date
    if results:
        for uid in results:
            r.hset(hashname_submit, uid, json.dumps({"system":1, "operation":"system"}))
    #status = save_recommentation2redis(date, results)
    #if status != True:
    #    print 'cron/recommend_in/recommend_in.py&error-3&'

#abandon in version: 16-02-29
'''
def write_sensitive_user(results):
    csvfile = open('/home/ubuntu8/huxiaoqian/user_portrait/user_portrait/cron/recommentation_in/sensitive_user.csv', 'wb')
    writer = csv.writer(csvfile)
    for user in results:
        writer.writerow([user])
    return True
'''

if __name__=='__main__':
    log_time_start_ts = time.time()
    log_time_start_date = ts2datetime(log_time_start_ts)
    print 'cron/recommend_in/recommend_in.py&start&' + log_time_start_date
    # try:
    main()
    # except Exception, e:
    #     print e, '&error&', ts2date(time.time())

    log_time_ts = time.time()
    log_time_date = ts2datetime(log_time_ts)
    print 'cron/recommend_in/recommend_in.py&end&' + log_time_date
