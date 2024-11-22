from flask import Blueprint, jsonify
from db import mongo

sector_bp = Blueprint("sector",__name__)

@sector_bp.route('/api/sector', methods=['GET'])
def getSector():
    unique_sector = mongo.db['analytics-data'].distinct('sector')
    filtered_unique_sector = filter(lambda sector: sector and sector.strip(), unique_sector)
    return jsonify(list(filtered_unique_sector))
