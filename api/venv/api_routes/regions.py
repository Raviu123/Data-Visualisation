from flask import Blueprint, jsonify
from db import mongo  # Import mongo from db.py

regions_bp = Blueprint('regions', __name__)

@regions_bp.route('/api/regions', methods=['GET'])
def get_regions():
    unique_regions = mongo.db['analytics-data'].distinct('region')
    filtered_regions = filter(lambda region: region and region.strip(), unique_regions)
    return jsonify(list(filtered_regions))

