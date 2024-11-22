from flask import Blueprint, jsonify
from db import mongo

pest_bp = Blueprint("pest",__name__)

@pest_bp.route('/api/pest', methods=['GET'])
def getPest():
    uniquePest = mongo.db['analytics-data'].distinct('pestle')
    filtered_unique_pestle = filter(lambda pestle: pestle and pestle.strip(), uniquePest)  # Filter out empty or None
    return jsonify(list(filtered_unique_pestle))

