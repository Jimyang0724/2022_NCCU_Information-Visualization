import os
import json
from matplotlib.cbook import print_cycles
import pandas as pd
from tqdm import tqdm

SRC_FOLDER = './'
SRC_FILE = 'data_now.json'


def main():
    src_path = os.path.join(SRC_FOLDER, SRC_FILE)
    with open(src_path) as f:
        data = json.load(f)
    
    edit_data = {'Name' :'Anime', 'children': []}
    
    genres = []
    seasons = ['Winter', 'Spring', 'Summer', 'Fall']
    for d in data:
        d['Name'] = d['Japanese name']
        d['Genres'] = d['Genres'].split(', ')
        d['Producers'] = d['Producers'].split(', ')
        d['Premiered'] = d['Premiered'].split(' ')
        d['value'] = 1
        d_genres = d['Genres']
        for d_genre in d_genres:
            if d_genre not in genres:
                genres.append(d_genre)
                
    for g in genres:
        edit_data['children'].append({'Name': g, 'children': []})
        
    for g_child in edit_data['children']:
        
        for y in range(2000, 2021):
            g_child['children'].append({'Name': y, 'children': []})
        for y_child in g_child ['children']:
            for s in seasons:
                y_child['children'].append({'Name': s, 'children': []})
                
    for d in data:
        season = d['Premiered'][0]
        year = int(d['Premiered'][1])
        
        for g_child in edit_data['children']:
            for g in d['Genres']:
                if g_child['Name'] == g:
                    for y_child in g_child['children']:
                        if y_child['Name'] == year:
                            for s_child in y_child['children']:
                                if s_child['Name'] == season:
                                    s_child['children'].append(d)
              
    count = 0
    
    to_del = []
    for g_child in edit_data['children']:
        for y_child in g_child['children']:
            for s_child in y_child['children']:
                    count += len(s_child['children'])
        # print (g_child["Name"])
        # print(count)
        if count < 105:
            print (g_child["Name"])
            print(count)
            to_del.append(g_child)
            print()

        count = 0
    for d in to_del:
        edit_data['children'].remove(d)
                
    # for g_child in edit_data['children']:
    #     for y in range(2000, 2021):
    #         edit_data['children'].append({'Name': y, 'children': []})
    
    # edit_data = {}
    # for d in tqdm(data):
    #     d['Genres'] = d['Genres'].split(', ')
    #     d['Producers'] = d['Producers'].split(', ')
    #     d['Premiered'] = d['Premiered'].split(' ')
    #     d['value'] = 1
        
    #     year = int(d['Premiered'][1])
    #     season = d['Premiered'][0]
    #     genres = d['Genres']
        
    #     for g in genres:
    #         if not any(dd['Name'] == g for dd in edit_data['children']):
    #             edit_data['children'].append({'Name': g, 'children': []})
        
    #     for g_children in edit_data['children']:
    #         if any(g_children['Name'] == g for g in genres):
    #             if not any(dd['Name'] == year for dd in g_children['children']):
    #                 g_children['children'].append({'Name': year, 'children': []})
    #                 print(d)
                    
    #             for y_children in g_children['children']:
    #                 if y_children['Name'] == year:
    #                     if not any(dd['Name'] == season for dd in y_children['children']):
    #                         y_children['children'].append({'Name': season, 'children': []})
    #                         for s_children in y_children['children']:
    #                             if s_children['Name'] == season:
    #                                 d['Name'] = d['Japanese name']
    #                                 s_children['children'].append(d)
                        # if any(y_children['Name'] == g for g in genres):
                        
                        
                        
                        # for g in d['Genres']:
                        #     if not any(dd['Name'] == g for dd in s_children['children']):
                        #         s_children['children'].append({'Name': g, 'children': []})
                        #     for g_children in s_children['children']:
                        #         if g_children['Name'] == g:
                        #             d['Name'] = d['Japanese name']
                        #             g_children['children'].append(d)

                                    # print(y_children)
                                    # print(s_children)
                                    # print(g_children)
                                    # print(d)
                                    # print(g_children['name'])
                                    # print(g)
                                    # print()
                                    # print(g_children['name'] )
        # print('\n\n')
            
        # if year not in edit_data:
        #     edit_data[f'{year}'] = {}
        # if season not in edit_data[f'{year}']:
        #     edit_data[f'{year}'][f'{season}'] = {}
            
        # for g in d['Genres']:
            
        #     if g not in edit_data[f'{year}'][f'{season}']:
        #         edit_data[f'{year}'][f'{season}'][f'{g}'] = []
        #     edit_data[f'{year}'][f'{season}'][f'{g}'].append(d)
            
        
    # edit_data['children'] = sorted(edit_data['children'], key=lambda d: d['Name'])
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(edit_data, f, indent=2)

if __name__ == '__main__':
    main()