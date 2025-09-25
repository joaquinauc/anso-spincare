from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, SelectField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired, ValidationError, Email, EqualTo, Length

import sqlalchemy as sa

from app import db
from app.models import User

class LoginForm(FlaskForm):
    password = PasswordField('Password', validators=[DataRequired()])


class AddUserForm(FlaskForm):
    names = StringField('Names', validators=[DataRequired()])
    first_last_name = StringField('First Last Name', validators=[DataRequired()])
    second_last_name = StringField('Second Last Name')
    password = PasswordField('Password', validators=[DataRequired()])
    role = StringField('Role', validators=[DataRequired()])
    