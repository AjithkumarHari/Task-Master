import express from "express";
// import userController from "../../../adaptor/controllers/userController";
// import { userDbRepository } from "../../../application/repository/userDbRepository"; 
// import { userRepositoryMongoDB } from "../../database/repository/userDbRepository";
// import { workerDbRepository } from "../../../application/repository/workerDbRepository";
// import { workerRepositoryMongoDB } from "../../database/repository/workerDbRepository";
// import { serviceDbRepository } from "../../../application/repository/serviceDbRepository";
// import { serviceDbRepositoryMongoDB } from "../../database/repository/serviceDbRepository.";
// import { bookingDbRepository } from "../../../application/repository/bookingDbRepository";
// import { bookingDbRepositoryMongoDB } from "../../database/repository/bookingDbRepository"; 
// import { reviewDbRepository } from "../../../application/repository/reviewDbRepository";
// import { reviewDbRepositoryMongoDB } from "../../database/repository/reviewDbrepository";
// import { walletDbRepository } from "../../../application/repository/walletDbRepository";
// import { walletDbRepositoryMongoDB } from "../../database/repository/walletDbRepository";
// import { complaintDbRepository } from "../../../application/repository/complaintDbRepository";
// import { complaintDbRepositoryMongoDB } from "../../database/repository/complaintDbRepository";
// import { paymentServiceInterface } from "../../../application/service/paymentServiceInterface";
// import { paymentService } from "../../service/paymentService";
// import { authService } from "../../service/authService";
// import { authServiceInterface } from "../../../application/service/authServiceInterface";

const userRouter = () => {
    const router = express.Router()
    
//     const controller = userController(
//         userDbRepository,
//         userRepositoryMongoDB,
//         workerDbRepository,
//         workerRepositoryMongoDB,
//         serviceDbRepository,
//         serviceDbRepositoryMongoDB,
//         bookingDbRepository,
//         bookingDbRepositoryMongoDB,
//         reviewDbRepository,
//         reviewDbRepositoryMongoDB,
//         walletDbRepository,
//         walletDbRepositoryMongoDB,
//         complaintDbRepository,
//         complaintDbRepositoryMongoDB,
//         paymentServiceInterface,
//         paymentService,
//         authServiceInterface,
//         authService,
//     )

//     router.get('/worker-list',controller.getAllWorkers);

//     router.get('/worker-details/:id',controller.getWorkerById);

//     router.get('/service-list',controller.getAllServices);

//     router.post('/book-worker',controller.bookingWorker);

//     router.post('/add-review',controller.reviewWorker);

//     router.get('/review-list/:id',controller.getReviewByWorkerId);

//     router.get('/booking-list/:id',controller.getBookingByUser);
    
//     router.get('/worker-booked-list/:id',controller.getBookingByWorker);
    
//     router.put('/booking-cancel',controller.cancelBooking);

//     router.put('/edit-user',controller.updateUserProfile);

//     router.get('/wallet/:id',controller.getWalletByUser);
    
//     router.get('/isBooked/:userId/:workerId',controller.isWorkerBooked);

//     router.post('/add-complaint',controller.complaintWorker);

    return router;
}

export default userRouter;