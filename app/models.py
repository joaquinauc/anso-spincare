from typing import Optional
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db, login

class User(UserMixin, db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    password_hash: so.Mapped[str] = so.mapped_column(sa.String(256), unique=True)
    names: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    first_last_name: so.Mapped[str] = so.mapped_column(sa.String(32), index=True)
    second_last_name: so.Mapped[Optional[str]] = so.mapped_column(sa.String(32), index=True)
    role: so.Mapped[str] = so.mapped_column(sa.String(32))
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    

class Patient(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    age: so.Mapped[int] = so.mapped_column(sa.Integer())
    sex: so.Mapped[str] = so.mapped_column(sa.String(16))
    phone_number: so.Mapped[int] = so.mapped_column(sa.Integer())
    illness: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    medicine: so.Mapped[str] = so.mapped_column(sa.String(256), index=True)
    expedient_number: so.Mapped[int] = so.mapped_column(sa.Integer(), index=True)
    allergies: so.Mapped[str] = so.mapped_column(sa.String(256), index=True)

# Guarda user.id en la sesión
# Cada vez que accedes a current_user, Flask-Login llama a load_user(user_id) para obtener el objeto User actual.
@login.user_loader
def load_user(id):
    return db.session.get(User, int(id))