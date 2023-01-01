
exports.dashboard = (req, res) => {
    try {
        const user = req.user.username
        console.log(req.user)
        res.render('dashboard', {title : "DASHBOARD", user})
    } catch (error) {
        console.log(error)
        return res.redirect('login')
    }
}