from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, SelectField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired, ValidationError, Email, EqualTo, Length

import sqlalchemy as sa

from app import db
from app.models import User

class LoginForm(FlaskForm):
    password = PasswordField('Password', validators=[DataRequired()])