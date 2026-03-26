
const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Erro interno do servidor";

  // Prisma - registro não encontrado
  if (err.code === "P2025") {
    statusCode = 404;
    message = "Recurso não encontrado";
  }

  // Prisma - duplicação
  if (err.code === "P2002") {
    statusCode = 409;
    message = "Conflito: dado duplicado";
  }

  // Prisma - erro de relação
  if (err.code === "P2003") {
    statusCode = 400;
    message = "Erro de relação entre dados";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
};

export default errorMiddleware;