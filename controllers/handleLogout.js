async function handleLogout(req, res) {
    res.clearCookie("token");
    res.clearCookie("uid");
    req.session?.destroy(); // Distroys the express- sessions

    res.redirect('/home/logout');
}

export default handleLogout;