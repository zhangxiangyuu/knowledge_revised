# -*- coding: utf-8 -*-
import sys
import time
import json
from weibo_api import read_flow_text, read_flow_text_sentiment
from cron_text_attribute import test_cron_text_attribute_v2
reload(sys)
sys.path.append('../../')
from parameter import WEIBO_API_INPUT_TYPE


def event_user_portrait(event_uid_list, submit_user_dict, submit_ts_dict):
    task_mark = 'event'
    #for test
    #submit_user_dict = dict()
    #submit_ts_dict = dict()
    iter_user_list = []
    no_in_user_list = []
    relation_mark_dict = dict()
    count = 0
    for uid in event_uid_list:
        #for test
        #submit_user_dict[uid] = 'admin'
        #submit_ts_dict[uid] = 1504195200
        iter_user_list.append(uid)
        if len(iter_user_list) % 100 == 0 and len(iter_user_list) != 0:
            #acquire bulk user weibo data
            if WEIBO_API_INPUT_TYPE == 0:
                user_keywords_dict, user_weibo_dict, online_pattern_dict, character_start_ts = read_flow_text_sentiment(iter_user_list)
            else:
                user_keywords_dict, user_weibo_dict, online_pattern_dict, character_start_ts = read_flow_text(iter_user_list)
            #compute text attribute
            compute_status = test_cron_text_attribute_v2(user_keywords_dict, user_weibo_dict, online_pattern_dict, character_start_ts, relation_mark_dict, task_mark, submit_user_dict, submit_ts_dict)
            
            if len(user_keywords_dict) != len(iter_user_list):
                change_user_list = set(iter_user_list) - set(user_keywords_dict.keys())
                no_in_user_list.extend(list(change_user_list))

            iter_user_list = []
            
    if iter_user_list != []:
        #acquire bulk user weibo date
        print 'iter_user_list:', len(iter_user_list)
        if WEIBO_API_INPUT_TYPE == 0:
            user_keywords_dict, user_weibo_dict, online_pattern_dict, character_start_ts = read_flow_text_sentiment(iter_user_list)
        else:
            user_keywords_dict, user_weibo_dict, online_pattern_dict, character_start_ts = read_flow_text(iter_user_list)
        #compute text attribute
        print 'user_weibo_dict:', len(user_weibo_dict)
        compute_status = test_cron_text_attribute_v2(user_keywords_dict, user_weibo_dict, online_pattern_dict, character_start_ts, relation_mark_dict, task_mark, submit_user_dict, submit_ts_dict)

        if len(user_keywords_dict) != len(iter_user_list):
            change_user_list = set(iter_user_list) - set(user_keywords_dict.keys())
            no_in_user_list.extend(list(change_user_list))

    return no_in_user_list 




if __name__=='__main__':
	uid_list = ['3151191055', '2239380233']
	no_in_user_list = event_user_portrait(uid_list)
