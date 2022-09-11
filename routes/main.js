const router = require('express').Router()
const User = require('../schemas/user')
const Voucher = require('../schemas/voucher')

router.post('/login', async (req, res) => {
    try {
        res.set('Access-Control-Allow-Origin', '*');
        const { name, password } = req.body
        const user = await User.findOne({ name, password, disabled: false })
        if (!user) return res.status(400).send('Failed')
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.route('/pending')
    .get(async (req, res) => {
        try {
            const vouchers = await Voucher.find({ status: 'processing' })
            res.send(vouchers)
        } catch (err) {
            res.status(500).send(err)
        }
    })

router.route('/users')
    .get(async (req, res) => {
        try {
            const users = await User.find({ disabled: false })
            console.log(users)
            res.send(users)
        } catch (err) {
            res.status(500).send(err)
        }
    }).post(async (req, res) => {
        try {
            const { name, password, branch, role } = req.body
            console.log(req.body)
            const user = await User.create({ name, password, branch, role })
            res.send(user)
        } catch (err) {
            res.status(500).send(err)
        }
    })


router.route('/user/:id')
    .get(async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            res.send(user)
        } catch (err) {
            res.status(500).send(err)
        }
    }).delete(async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            user.disabled = true
            await user.save()
            res.send(user)
        } catch (err) {
            res.status(500).send(err)
        }
    })

router.get('/approve/:id', async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id)
        voucher.status = 'approved'
        voucher.approvedBy = req.query.userId
        await voucher.save()
        res.send(voucher)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.route('/voucher/add')
    .post(async (req, res) => {
        try {
            const { name, description, amount, branch } = req.body
            const voucher = new Voucher({
                name,
                description,
                value: amount,
                branch
            })
            voucher.save()
            res.send("Success")
        } catch (err) {
            res.status(500).send(err)
        }

    })

router.route('/voucher/:id')
    .get(async (req, res) => {
        try {
            const { id } = req.params
            const voucher = await Voucher.findById(id)
            const theuser = await User.findById(voucher.name)
            const approver = await User.findById(voucher.approvedBy)
            res.send({ voucher, theuser, approver })
        } catch (err) {
            res.status(500).send(err)
        }
    })

router.get('/delete/:id')
    .get(async (req, res) => {
        try {
            const { id } = req.params
            const voucher = await Voucher.findById(id)
            voucher.status = 'declined'
            res.send("Success")
        } catch (err) {
            res.status(500).send(err)
        }
    })



router.route('/vouchershow/:id')
    .get(async (req, res) => {
        try {
            let date = new Date(Date.now())
            let id = req.params.id
            date = date.toISOString().substring(0, 10)
            date = new Date(date)
            const vouchers = await Voucher.find({ date: { $gte: date }, status: 'approved', name: id })
            res.send(vouchers)
        } catch (err) {
            res.status(500).send(err)
        }
    })
    .post(async (req, res) => {
        try {
            const { date } = req.body
            let resdate = new Date(date)
            resdate = resdate.toISOString().substring(0, 10)
            resdate = new Date(resdate)
            let dateend = new Date(resdate)
            dateend.setDate(dateend.getDate() + 1)
            const vouchers = await Voucher.find({ date: { $gte: resdate, $lte: dateend }, status: 'approved', name: req.params.id })
            res.send(vouchers)
        } catch (err) {
            res.status(500).send(err)
        }
    })

router.route('/vouchershow')
    .get(async (req, res) => {
        try {
            let date = new Date(Date.now())
            date = date.toISOString().substring(0, 10)
            date = new Date(date)
            const vouchers = await Voucher.find({ date: { $gte: date }, status: 'approved' })
            res.send(vouchers)
        } catch (err) {
            res.status(500).send(err)
        }
    })
    .post(async (req, res) => {
        try {
            const { date } = req.body
            let resdate = new Date(date)
            resdate = resdate.toISOString().substring(0, 10)
            resdate = new Date(resdate)
            let dateend = new Date(resdate)
            dateend.setDate(dateend.getDate() + 1)
            const vouchers = await Voucher.find({ date: { $gte: resdate, $lte: dateend }, status: 'approved' })
            res.send(vouchers)
        } catch (err) {
            res.status(500).send(err)
        }
    })

router.get('/', (req, res) => {
    console.log(process.env.TZ); // undefined
    res.send(new Date().toString());
})






module.exports = router