const Tree = require('../model/tree');

// Add Tree logic
exports.add_tree = (req, res, next) => {
    // Check user is added child tree or not
    Tree.findById(req.body._id).then(treeResult => {
            if (treeResult && req.body.items) {
                // Update parent tree if user is adding child tree in parent tree
                treeResult.items = [];
                treeResult.items = req.body.items;
                treeResult.save()
                    .then(result => {
                        res.status(200).json({
                            message: 'Tree added successfully!'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            } else if (treeResult) {
                console.log("Edit ");
                
            } else {
                // Add new tree
                const treeObject = new Tree({
                    id: req.body.id,
                    text: req.body.text,
                    pid: req.body.pid,
                    allowDrag: req.body.allowDrag,
                    selected: false,
                    items: []
                });
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
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// Get Tree logic
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

// Delete Tree logic
exports.delete_tree = (req, res, next) => {
    Tree.deleteOne({
            _id: req.params.id
        })
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

// Edit Tree logic
exports.edit_tree = (req, res, next) => {
    console.log(req.params);
    console.log(req.body);

};