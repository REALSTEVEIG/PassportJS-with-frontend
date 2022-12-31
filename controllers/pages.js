
exports.dashboard = (req, res) => {
    try {
        const user = req.user.username
        res.render('dashboard', {title : "DASHBOARD", user})
    } catch (error) {
        console.log(error)
        return res.redirect('login')
    }
}