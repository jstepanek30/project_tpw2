const User = require('../model/User');
const jwt = require('jsonwebtoken');

const errorHandler = (err) => {
    let errors = { email:'', password:'' }

    if(err.code === 11000){
        errors.email = 'That email is already taken'
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    if(err.message === 'Bad password'){
        errors.password = 'Bad password'
    }
    if(err.message === 'Bad email'){
        errors.email = 'Bad email'
    }

    return errors;
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'tureckej', { expiresIn: maxAge });
}

const getMain = (req,res) => {
    res.render('./index.hbs');
}

const getLogin = (req,res) => {
    res.render('./login')
}

const postLogin = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).redirect('/');
    } catch (error) {
        const errors = errorHandler(error)
        res.status(400).render('./login', { errors })
    }
}

const getRegister = (req,res) => {
    res.render('./register')
}

const postRegister = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).redirect('/')
    } catch (error) {
        const errors = errorHandler(error);
        res.status(400).render('./register', { errors })

    }
}
const getLogout = (req,res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}



module.exports = { getLogin, getRegister, postLogin, postRegister, getMain, getLogout };