module.exports = async (req, res, next) => {
  try {
    // console.log(req.user);
    if (req.user.role != 1 ) throw new Error ('Unauthorized')
    next()
  } catch (error) {
    res.send({
      status: false,
      error: error.message || "Unauthorized",
    });    
  }
}