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


@app.route('/login', methods={'POST'})
def login():
    form = LoginForm()

    user = db.first_or_404(sa.select(User).where(User.password_hash == form.password.data))
    role = user.role

    login_user(user)
    session['role'] = user.role

    if form.validate_on_submit():
        return jsonify({'success': True, 'redirect': url_for('dashboard')})
    
    return jsonify({'success': False, 'errors': form.errors})