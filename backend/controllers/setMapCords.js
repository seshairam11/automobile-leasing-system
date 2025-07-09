const AccessMapCoordsModel = require('../modules/mapCoordsModule')

exports.setMapCords = async (Socket, io) => {
    Socket.on('joinRoom', async (id) => {
        try {
            Socket.join(id)
            const coords = await AccessMapCoordsModel.find({ referId: id })
            console.log(coords)
            if (coords.length !== 0) {
                Socket.emit(id, {
                    droplocationCords: coords[0].droplocationCords,
                    pickupCords: coords[0].pickupCords,
                });
            } else {
                Socket.emit(id, {});
            }

        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('updatelocation', async (id, cords) => {
        const updateCoords = await AccessMapCoordsModel.findOneAndUpdate(
            { referId: id }, // Filter condition
            {
                $set: {
                    pickupCords: cords.pickupCords,
                    droplocationCords: cords.droplocationCords,
                },
            },
            { new: true } // Returns the updated document
        );

        io.to(id).emit(id, (cords));

    })
}

