from flask import Flask
from flask_cors import CORS
from api_routes.regions import regions_bp
from api_routes.sector import sector_bp
from api_routes.pest import pest_bp
from api_routes.source import source_bp
from api_routes.country import country_bp
from api_routes.filterdata import filterdata_bp
from db import mongo  # Import mongo from db.py

app = Flask(__name__)
CORS(app)

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/analytics_project"
mongo.init_app(app)  # Initialize with the Flask app

# Register blueprints
app.register_blueprint(regions_bp)
app.register_blueprint(sector_bp)
app.register_blueprint(pest_bp)
app.register_blueprint(source_bp)
app.register_blueprint(country_bp)

app.register_blueprint(filterdata_bp)

@app.route('/', methods=['GET'])
def home():
    return "Backend is working"

if __name__ == '__main__':
    app.run(debug=True)
