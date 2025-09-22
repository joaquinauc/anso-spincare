from flask import send_from_directory, request, jsonify, render_template, url_for, redirect, session
from flask_login import current_user, login_user, logout_user, login_required
from app import app, db
from app.models import User
from app.forms import LoginForm
from functools import wraps
import sqlalchemy as sa

from urllib.parse import urlsplit

@app.route('/')
@app.route('/index')
def index():
    form = LoginForm()
    return render_template('index.html', form=form)