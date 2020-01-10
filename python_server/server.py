from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from pymorphy2 import MorphAnalyzer
import pandas as pd
import pymorphy2
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.datasets import make_blobs
from scipy.cluster.hierarchy import linkage, dendrogram, fcluster
#!flask/bin/python
from flask import Flask, jsonify
from flask import request
import json
from flask import abort

m = MorphAnalyzer()
current_phrases = [];
# /anaconda3/bin/python /Users/user/Desktop/Server_node_python_diplom/python_server/server.py

class LemTfIdVectorizer(TfidfVectorizer):
    def build_analyzer(self):
        analyzer = super(TfidfVectorizer, self).build_analyzer()
        return lambda x: (m.parse(word)[0].normal_form for word in analyzer(x))

def funcVectorizer(_phrases):
    m = pymorphy2.MorphAnalyzer()
    tfidf_v = TfidfVectorizer(min_df=1)
    cv = CountVectorizer(min_df=1)
    cv2 = CountVectorizer(min_df=1)
    phrases = _phrases;

    x = cv.fit_transform(phrases)
    x2 = cv2.fit_transform(phrases)

    data = pd.DataFrame(data=x.toarray(), columns=cv.get_feature_names(), index=phrases)
    data2 = pd.DataFrame(data=x2.toarray(), columns=cv2.get_feature_names(), index=phrases)


    lemn_phrases = [' '.join([m.parse(word)[0].normal_form for word in x.split()]) for x in phrases]

    x_1 = cv.fit_transform(lemn_phrases)
    x_2 = cv2.fit_transform(lemn_phrases)

    data_1 = pd.DataFrame(data=x_1.toarray(), columns=cv.get_feature_names(), index=phrases)
    data_2 = pd.DataFrame(data=x_2.toarray(), columns=cv2.get_feature_names(), index=phrases)

    more_inform = tfidf_v.fit_transform(lemn_phrases)
    more_data_info = pd.DataFrame(data=more_inform.toarray(), columns=tfidf_v.get_feature_names(), index=phrases)
    return more_data_info;

def kMeansAlgo(phrases, count_clusters):
    tfd_lem_vec = TfidfVectorizer(min_df=2)
    X = tfd_lem_vec.fit_transform(phrases);
    k_means = KMeans(n_clusters=int(count_clusters),
                    init='k-means++',
                    n_init=10,
                    max_iter=300,
                    tol=0.0001)
    k_means.fit(X)
    dct = {}
    for key, label in zip(phrases, k_means.labels_):
        dct[label] = dct.get(label, [])+[key]
    buff = {}
    for key in dct:
        buff[str(key)] = dct[key]
    return buff

app = Flask('__main__')
@app.route('/', methods=['GET'])
def index_router():
    return jsonify({'success': 0})
@app.route('/api/v1/statistics/', methods=['POST'])
def index():
    phrases = request.get_json('phrases')['phrases']
    print(request.get_json('phrases'))
    print(phrases)
    vaectorizer_data = funcVectorizer(phrases)
    column = vaectorizer_data.columns.tolist()
    rows = phrases
    return jsonify(
        {
            'column': column,
            'rows': phrases,
            'values': vaectorizer_data.values.tolist()
        }
    )

@app.route('/api/v1/statistics/k_means', methods=['POST'])
def route_k_means():
    phrases = request.get_json('phrases')['phrases']
    count_clusters = request.get_json('count_cluster')['count_cluster']
    print(count_clusters)
    responce = kMeansAlgo(phrases, count_clusters)
    return jsonify({
        'responce': responce
    })

@app.route('/api/v1/statistics/criterion', methods=['POST'])
def create_criterion():
    r_range = request.get_json('range')['range']
    phrases = request.get_json('phrases')['phrases']
    tfd_lem_vec = TfidfVectorizer(min_df=2)
    X = tfd_lem_vec.fit_transform(phrases);
    k_means = KMeans(n_clusters=r_range, init='k-means++', n_init=10, max_iter=300, tol=0.0001)
    k_means.fit(X)
    crit = []
    for k in range(1, r_range):
        kmeans = KMeans(n_clusters=k, random_state=1)
        kmeans.fit(X)
        crit.append(kmeans.inertia_)
    
    return jsonify({
        'criterion': crit
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug='true')
