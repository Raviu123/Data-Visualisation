from flask import Blueprint, jsonify
from db import mongo

country_bp = Blueprint("country",__name__)

@country_bp.route('/api/country', methods=['GET'])
def getPest():
    uniquecountry= mongo.db['analytics-data'].distinct('country')
    filtered_unique_country = filter(lambda country: country and country.strip(), uniquecountry)  # Filter out empty or None
    return jsonify(list(filtered_unique_country))