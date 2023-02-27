<template>
	<div>
		<div class="modal" id="addProduct">
			<div
				class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-width"
			>
				<div class="modal-content">
					<div class="modal-header">
						<span class="modal-title">Add Product</span>
						<button
							type="button"
							class="close"
							data-dismiss="modal"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form v-on:submit="addProduct()">
							<div class="form-group text-left">
								<label class="font-size">Product Title:</label>
								<input
									type="text"
									class="form-control"
									v-model="productForm.productTitle"
								/>
							</div>
							<div class="form-group text-left">
								<label class="font-size">Quantity Total:</label>
								<input
									type="text"
									class="form-control"
									v-model="productForm.quantityTotal"
								/>
							</div>
							<div class="form-group text-left">
								<label class="font-size">Quantity Booked:</label>
								<input
									type="text"
									class="form-control"
									v-model="productForm.quantityBooked"
								/>
							</div>
							<div class="form-group text-left">
								<label class="font-size">Price:</label>
								<input
									type="text"
									class="form-control"
									v-model="productForm.destination"
								/>
							</div>
							<div
								class="d-flex justify-content-center pt-4 pb-3"
							>
								<button
									class="login-button text-white"
									v-bind:class="[
										submitting ? 'button-disable' : ''
									]"
								>
									Add
									<i
										class="fas fa-spinner fa-spin ml-1"
										v-if="submitting"
									></i>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<navbar-component />
		<div class="m-auto table-container py-3 d-flex flex-column">
			<button
				type="button"
				class="btn btn-outline-primary btn-sm mr-auto button-width mb-4"
				data-toggle="modal"
				data-target="#addProduct"
			>
				<i class="fas fa-plus-circle mr-2"></i>
				<span class="mr-2">Add Product</span>
			</button>
			<table class="w-100 table table-bordered">
				<thead class="bg-light">
					<tr>
						<th>Product Title</th>
						<th>Quantity Total</th>
						<th>Quantity Booked</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-if="!productList || productList?.length === 0"
						class="text-muted"
					>
						<span v-if="!productList">
							<i class="fas fa-spinner fa-spin mr-1"></i>
							Loading...
						</span>
						<span v-if="productList?.length === 0">
							{{ errorMessage }}
						</span>
					</tr>
					<tr
						v-for="item in productList"
						v-bind:key="item.aircraftId"
					>
						<td>{{ item.productTitle }}</td>
						<td>{{ item.quantityTotal }}</td>
						<td>{{ item.quantityBooked }}</td>
						<td>{{ item.price }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import NavbarComponent from './Navbar.vue';
import axios from '../helpers/axios';

export default {
	name: 'ProductComponent',
	components: {
		NavbarComponent
	},
	data() {
		return {
			productList: [],
			errorMessage: null,
			submitting: false,
			productForm: {
				productTitle: null,
				quantityTotal: null,
				quantityBooked: null,
				price: null
			}
		};
	},
	mounted() {
		this.productList = null;
		setTimeout(() => {
			this.fetchProductList();			
		}, 500);
	},
	methods: {
		async fetchProductList() {
			await axios.get('/products').then((res) => {
				this.producttList = res.data;
			})
			.catch((err) => {
					if (err.response.status == 404) {
						this.productList = [];
						this.errorMessage = err.response.data;
					}
				});
		},
		async addAircraft() {
			this.submitting = true;
			await axios
				.post('/product', this.productForm)
				.then((res) => {
					console.log(res);
				})
		}
	}
};
</script>


