from flask import send_from_directory, request, jsonify, render_template, url_for, redirect, session
from flask_login import current_user, login_user, logout_user, login_required
from app import app, db
from app.models import User
from app.forms import LoginForm, AddUserForm
from functools import wraps
import sqlalchemy as sa

from urllib.parse import urlsplit

def require_role(role):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if session.get('role') != role:
                print(session.get('role'))
                return jsonify({'error': 'No autorizado'}), 403
            return f(*args, **kwargs)
        return wrapper
    return decorator


@app.route('/')
@app.route('/index')
def index():
    form = LoginForm()
    return render_template('index.html', form=form)


@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/add_user')
@require_role('admin')
def add_user():
    form = AddUserForm()
    return render_template('add_user.html', form=form)


@app.route('/api/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        user = db.session.execute(
            sa.select(User).where(User.password_hash == form.password.data)
        ).scalar_one_or_none()

        if user is None:
            return jsonify({'success': False, 'errors': {'user': ['Usuario no encontrado']}})

        login_user(user)
        session['role'] = user.role

        return jsonify({'success': True, 'redirect': url_for('dashboard')})
    return jsonify({'success': False, 'errors': form.errors})


@app.route('/api/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'redirect': url_for('index')})


@app.route('/api/get_role')
@login_required
def get_role():
    return jsonify({'role': current_user.role})


@app.route('/api/add_user', methods=['GET', 'POST'])
@require_role('admin')
def add_user_api():
    form = AddUserForm()

    if form.validate_on_submit():
        user = User(
            password_hash=form.user_password.data,
            names=form.user_name.data, 
            first_last_name=form.user_first_last_name.data, 
            second_last_name=form.user_second_last_name.data, 
            role=form.user_role.data
            )
        db.session.add(user)
        db.session.commit()

        return jsonify({'success': True, 'redirect': url_for('dashboard')})
    return jsonify({'success': False, 'errors': form.errors})