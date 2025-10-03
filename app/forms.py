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
    user_name = StringField('Names', validators=[DataRequired()])
    user_first_last_name = StringField('First Last Name', validators=[DataRequired()])
    user_second_last_name = StringField('Second Last Name')
    user_password = PasswordField('Password', validators=[DataRequired()])
    user_role = StringField('Role', validators=[DataRequired()])
    