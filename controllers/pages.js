
exports.dashboard = async (req, res) => {
    try {
        const user = req.user.username
        const picture = await req.user.picture
        console.log(req.user)
        res.render('dashboard', {title : "DASHBOARD", user, picture})
    } catch (error) {
        console.log(error)
        return res.redirect('login')
    }
}