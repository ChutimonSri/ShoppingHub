<template>
  <div class="orders">
    <div class="container">
      <table v-if="getOrders.length" class="table">
        <tbody>
          <tr v-for="item in getOrders" :key="item.id">
            <td class="item-image">
              <img :src="item.image" alt="item iamge" />
            </td>
            <td class="item-name">{{ item.name }}</td>
            <td class="ammount">{{ item.quantity }} item</td>
            <td class="item-price">{{ item.price }} $</td>
            <td class="statuse">
              <base-badge v-if="item.state === 'reject'" class="reject">
                rejected
              </base-badge>
              <base-badge v-else-if="item.state === 'agree'" class="complete"
                >completed</base-badge
              >
              <base-badge v-else class="in-proccess">in process</base-badge>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="noitem" v-else>
        <p>no orders !!!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getOrders() {
      return this.$store.getters.getUserorders;
    },
  },
};
</script>

<style lang="scss" scoped>
table,
td,
tr,
th,
thead,
tbody {
  border: none;
}
.orders {
  padding: 90px 0 30px;
  min-height: 100vh;
  .noitem {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    p {
      font-size: 30px;
      font-weight: bold;
    }
  }
  .table {
    tr {
      border-bottom: 1px solid #bbb;
      @media (max-width: 500px) {
        .item-image {
          width: 35px;
          height: 35px;
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
      td {
        @media (max-width: 500px) {
          font-size: 10px;
          font-weight: normal;
        }
        padding: 10px 0;
      }
      .statuse {
        width: 150px;
        .badge {
          width: fit-content;
          margin: auto;
          color: var(--primary-color);
          &.complete {
            background-color: var(--main-color);
            color: #fff;
          }
          &.reject {
            background-color: var(--danger-color);
            color: inherit;
          }
        }
      }
    }
  }
}
</style>
