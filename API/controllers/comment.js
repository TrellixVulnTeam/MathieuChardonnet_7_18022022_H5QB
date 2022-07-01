const Remark = require('../models/comments');
const User = require('../models/user');

//creation Commentaire (POST)
exports.createRemark = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ["pseudo", "id"],
      where: {id: req.body.userId},
    })
    console.log("utilisateur trouvé", user.dataValues)
    const comment = await Remark.create({
      content: req.body.content,
      userId: req.body.userId,
      postId: req.body.postId,
    })
    comment.dataValues.User = user.dataValues
    console.log("commentaire créé", comment.dataValues)
    res.status(201).json({comment: comment})
  } catch {
    res.status(500).send({error: "Erreur serveur"})
  }
};
  
// suppression d'un commentaire (DELETE)
exports.deleteRemark = async (req, res) => {
  const comment = await Remark.destroy({where: {id: req.params.id}})
  res.status(200).json({comment, message: "Commentaire supprimé"})
}

// trouve tous les commentaires (GET)
exports.getAllRemarks = (req, res, next) => {
  Remark.findAll({ 
    where: { postId: req.query.id },
    include: [
      {
        model: User,
        attributes: ["pseudo", "id"],
      }
    ]
  })
    .then((comments) => {
      /*comments.map(comment =>{
        if(comment.User.avatar) comment.User.avatar = `http://localhost:4200/images/${comment.User.avatar}`
      })*/ 
      res.status(200).json(comments)})
    .catch((error) => res.status(404).json({ error }));
};