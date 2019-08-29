exports.errorHandling = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      status: 'failed',
      error: err.message
    };
  }
};
