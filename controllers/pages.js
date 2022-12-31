
exports.dashboard = (req, res) => {
    try {
        res.render('dashboard', {title : "DASHBOARD"})
    } catch (error) {
        console.log(error)
        return res.redirect('login')
    }
}