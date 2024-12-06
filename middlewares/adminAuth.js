function adminAuth(req, res, next) {
  if (req.session.user && req.session.user.id) {
    next();
  } else {
    console.log("Acesso negado: Usuário não autenticado.");
    res.redirect("/login?error=auth");
  }
}

module.exports = adminAuth;
