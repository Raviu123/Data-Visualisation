from flask import Flask, request, jsonify, Blueprint
from collections import Counter
from db import mongo
from bson import json_util
import json

filterdata_bp = Blueprint('filterdata', __name__)

@filterdata_bp.route('/api/getChartData', methods=['POST'])
def get_chart_data():
    try:
        filters = request.json
        if not filters:
            return jsonify({'error': 'No filters provided'}), 400

        query = {}
        # Build the query based on filters with type checking
        filter_fields = ['end_year', 'topic', 'sector', 'region', 'pestle', 'source', 'country']
        for field in filter_fields:
            if field in filters and filters[field]:
                # Handle end_year as integer
                if field == 'end_year':
                    try:
                        query[field] = int(filters[field])
                    except (ValueError, TypeError):
                        return jsonify({'error': f'Invalid {field} value'}), 400
                else:
                    query[field] = filters[field]

        # Query MongoDB with projection to only get needed fields
        projection = {
            'sector': 1,
            'topic': 1,
            'region': 1,
            'likelihood': 1,
            '_id': 0
        }
        
        filtered_data = list(mongo.db['analytics-data'].find(query, projection))

        if not filtered_data:
            return jsonify({
                'status': 'success',
                'message': 'No data found for given filters',
                'data': {
                    'pie': {'labels': [], 'data': []},
                    'donut': {'labels': [], 'data': []},
                    'bar': {'labels': [], 'data': []},
                    'frequencyDistribution': {'categories': [], 'counts': []}
                }
            })

        # Process data for charts with error handling
        pie_data = Counter(item.get('sector', 'Unknown') for item in filtered_data)
        donut_data = Counter(item.get('topic', 'Unknown') for item in filtered_data)
        bar_data = Counter(item.get('region', 'Unknown') for item in filtered_data)

        # Prepare frequency distribution data
        likelihood_counts = [0] * 5
        for item in filtered_data:
            likelihood = item.get('likelihood')
            if likelihood and isinstance(likelihood, (int, float)) and 1 <= likelihood <= 5:
                likelihood_counts[int(likelihood) - 1] += 1

        # Remove 'Unknown' entries if they exist and data is empty
        pie_data = {k: v for k, v in pie_data.items() if k != 'Unknown' or v != 0}
        donut_data = {k: v for k, v in donut_data.items() if k != 'Unknown' or v != 0}
        bar_data = {k: v for k, v in bar_data.items() if k != 'Unknown' or v != 0}

        response_data = {
            'status': 'success',
            'data': {
                'pie': {
                    'labels': list(pie_data.keys()),
                    'data': list(pie_data.values())
                },
                'donut': {
                    'labels': list(donut_data.keys()),
                    'data': list(donut_data.values())
                },
                'bar': {
                    'labels': list(bar_data.keys()),
                    'data': list(bar_data.values())
                },
                'frequencyDistribution': {
                    'categories': list(range(1, 6)),
                    'counts': likelihood_counts
                }
            }
        }

        return json.loads(json_util.dumps(response_data))

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500