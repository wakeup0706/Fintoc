exports.getUsers = async (req, res) => {
    res.send(req.user);
}
