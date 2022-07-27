const express = require('express')
const router = express.Router()

router.get('/about', (req,res) => res.render('about.ejs'))

router.get('/benefits', (req,res) => res.render('benefits.ejs'))

router.get('/event', (req,res) => res.render('event.ejs'))

router.get('/features', (req,res) => res.render('features.ejs'))

router.get('/guidelines', (req,res) => res.render('guidelines.ejs'))

module.exports = router




// <!-- <div class="container">
// <div class="row">
//   <% user.donated.forEach(function(donation){ %>
//     <div class="card col-md-4 products-card-div">
//       <h2></h2> -->
//       <!-- <form action="<%=route%>" method="post">
//         <img class="card-img-top" src="../public/uploads/<%=product.productImage%>" alt="Product Image">
//         <div class="card-body">
//           <h4><%=product.name%></h4>
//           <p><b>Rating(1-5):</b> <%=product.rating%></p>
//           <button type="submit" name="productPageButton" value="<%=product._id%>" class="btn btn-dark">Open</button>
//         </div>
//       </form> -->
//     <!-- </div>
//   <% }); %>
// </div>
// </div> -->