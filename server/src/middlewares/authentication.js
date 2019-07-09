const isAuthenticated = (req, res, next) => {
    return next();
};

const strategy = () => {
    // implement strategy here
};

export {
    strategy,
    isAuthenticated
}