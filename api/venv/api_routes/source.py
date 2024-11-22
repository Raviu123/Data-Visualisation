from flask import Blueprint, jsonify
from db import mongo

source_bp = Blueprint("source",__name__)

@source_bp.route('/api/source', methods=['GET'])
def getPest():
    uniquesource = mongo.db['analytics-data'].distinct('source')
    filtered_unique_source = filter(lambda source: source and source.strip(), uniquesource)  # Filter out empty or None
    return jsonify(list(filtered_unique_source))