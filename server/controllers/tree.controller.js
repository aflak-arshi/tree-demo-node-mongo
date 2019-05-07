const Tree = require('../model/tree');

exports.add_tree = (req, res, next) => {
    const treeObject = new Tree({
        text: req.body.text,
        pid: req.body.pid,
        allowDrag: req.body.allowDrag
    })
    treeObject.save()
        .then(result => {
            res.status(200).json({
                message: 'Tree added successfully!'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.get_tree = (req, res, next) => {
    Tree.find()
        .exec()
        .then(result => {
            res.status(200).json({
                message: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

};

exports.delete_tree = (req, res, next) => {
    Tree.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Tree deleted successfully!'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.edit_tree = (req, res, next) => {

};