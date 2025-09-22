import os
from sqlalchemy import create_engine

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    
    # Configuración para PostgreSQL
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
