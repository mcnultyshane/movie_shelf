
const router = require('express').Router();
const { User,Shelf, QrCode } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/:id', withAuth, async (req, res) => {
    try {
        const qrData= await QrCode.findOne({
            where : {
                id: req.params.id
            },
            attributes: [
                'id', 'shelf_url', 'shelf_id'
            ],
            include: [{
                model: Shelf,
                attributes: ['id']           
             }
            ]
        })
        if(!qrData) {
            res.status(404).json({ message: 'No movie found with this id'});
            return;
        }
        res.json(qrData)
    } catch (err) {
        console.log(err);
        res.status(500).json.err
    }
});

// Create a new QR url element for qrcode rendering.  
router.post('/', withAuth, async (req, res) => {
    try {
        const qrData = await QrCode.create({
           shelf_url: req.body.shelf_url
           ,
           shelf_id: req.session.shelf_id
        })
        res.json(qrData)
     // if there was a server error, return the error
    }  catch (err) {
        console.log(err);
        res.status(500).json.err
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {

        const qrData = await QrCode.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!qrData) {
            res.status(404).json({ message: 'No QR Code found with this id' });
            return;
          }
          res.json(qrData);
        } catch (err) {
            console.log(err);
            res.status(500).json.err
        }
});

module.exports = router;