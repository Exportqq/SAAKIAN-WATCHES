<template>
  <div class="min-h-screen bg-[#F7F7F7] px-4 py-10">
    <div class="max-w-[1000px] mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-[28px] font-extrabold">Админка</h1>
          <p class="text-[14px] text-[#888] mt-1">Заказов: {{ filteredOrders.length }}</p>
        </div>

        <button
          class="px-5 py-2.5 rounded-full border border-[#E5E5E5] text-[14px] font-semibold hover:bg-white transition"
          @click="logout"
        >
          Выйти
        </button>
      </div>

      <div class="flex gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          class="px-5 py-2 rounded-full text-[14px] font-semibold transition"
          :class="activeTab === tab.key ? 'bg-black text-white' : 'bg-white border border-[#E5E5E5] text-[#555]'"
        >
          {{ tab.label }}
        </button>
      </div>

      <div v-if="activeTab === 'orders'" class="space-y-4">
        <div class="bg-white p-4 rounded-[16px] border flex flex-wrap gap-3 items-center">
          <input
            v-model="searchPhone"
            placeholder="Поиск по телефону..."
            class="border border-[#E5E5E5] px-4 py-2 rounded-full text-[13px]"
          />

          <select v-model="bulkStatus" class="border border-[#E5E5E5] px-4 py-2 rounded-full text-[13px]">
            <option value="">Статус</option>
            <option value="processing">В обработке</option>
            <option value="waiting_payment">Ждёт оплаты</option>
            <option value="paid">Оплачен</option>
            <option value="shipped">В доставке</option>
            <option value="completed">Выполнен</option>
          </select>

          <button class="px-4 py-2 bg-black text-white rounded-full text-[13px]" @click="bulkUpdateStatus">
            Изменить статус
          </button>

          <button class="px-4 py-2 bg-red-500 text-white rounded-full text-[13px]" @click="bulkDelete">Удалить</button>

          <button class="px-4 py-2 border rounded-full text-[13px]" @click="clearSelection">Сброс</button>
        </div>

        <div class="flex gap-2 flex-wrap">
          <button
            v-for="f in statusFilters"
            :key="f.value"
            @click="statusFilter = f.value"
            class="px-4 py-1.5 rounded-full text-[13px] font-semibold transition"
            :class="statusFilter === f.value ? 'bg-black text-white' : 'bg-white border border-[#E5E5E5] text-[#555]'"
          >
            {{ f.label }}
          </button>
        </div>

        <div v-if="filteredOrders.length" class="space-y-3">
          <div
            v-for="order in filteredOrders"
            :key="order.id"
            class="bg-white border border-[#ECECEC] rounded-[20px] p-5"
          >
            <div class="flex items-start justify-between gap-4 flex-wrap">
              <div class="space-y-1 flex items-start gap-3">
                <input
                  type="checkbox"
                  :checked="selectedOrders.has(order.id)"
                  @change="toggleOrder(order.id)"
                  class="w-4 h-4 mt-1"
                />

                <div>
                  <p class="text-[15px] font-semibold">{{ order.fio }}</p>
                  <p class="text-[13px] text-[#888]">{{ order.phone }}</p>
                  <p class="text-[13px] text-[#888]">{{ order.address }}</p>
                  <p class="text-[13px] text-[#888]">
                    {{ order.delivery_type === 'cdek' ? 'СДЭК' : 'Яндекс Маркет' }}
                  </p>
                  <p v-if="order.comment" class="text-[13px] text-[#AAA] italic">{{ order.comment }}</p>
                  <p class="text-[12px] text-[#BBB] mt-1">{{ formatDate(order.created_at) }}</p>
                  <p class="text-[12px] text-[#BBB]">
                    Покупатель:
                    <span class="text-[#555] font-semibold">{{ order.user?.username ?? '—' }}</span>
                  </p>
                </div>
              </div>

              <div class="flex flex-col items-end gap-3">
                <select
                  :value="order.status"
                  class="text-[13px] font-semibold px-4 py-2 rounded-full border border-[#E5E5E5] bg-white focus:outline-none cursor-pointer"
                  @change="updateStatus(order.id, ($event.target as HTMLSelectElement).value)"
                >
                  <option value="processing">В обработке</option>
                  <option value="waiting_payment">Ждёт оплаты</option>
                  <option value="paid">Оплачен</option>
                  <option value="shipped">В доставке</option>
                  <option value="completed">Выполнен</option>
                </select>

                <div class="text-right space-y-0.5">
                  <p v-if="order.bonus_used > 0" class="text-[12px] text-[#999] line-through">
                    {{ order.total_price.toLocaleString() }} ₽
                  </p>
                  <p v-if="order.bonus_used > 0" class="text-[12px] text-green-600">
                    − {{ order.bonus_used.toLocaleString() }} ₽ бонусами
                  </p>
                  <p class="text-[15px] font-bold">{{ order.final_price.toLocaleString() }} ₽</p>
                </div>

                <button class="text-[13px] text-red-500 font-semibold" @click="deleteOrder(order.id)">Удалить</button>
              </div>
            </div>

            <div class="mt-4 border-t pt-4 space-y-2">
              <div v-for="item in order.items" :key="item.watch_id" class="flex items-center gap-3">
                <div class="w-10 h-10 bg-[#F5F5F5] rounded-[10px] overflow-hidden">
                  <img v-if="item.images?.[0]" :src="item.images[0]" class="w-full h-full object-contain" />
                </div>
                <div class="flex-1">
                  <p class="text-[13px] font-semibold truncate">{{ item.title }}</p>
                  <p class="text-[12px] text-[#999]">{{ item.brand }}</p>
                </div>
                <div class="text-right">
                  <p class="text-[13px] font-semibold">{{ item.price.toLocaleString() }} ₽</p>
                  <p class="text-[12px] text-[#999]">{{ item.quantity }} шт.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-[#888] text-[16px]">Заказов нет</div>
      </div>

      <div v-if="activeTab === 'users'" class="space-y-3">
        <div v-if="users.length" class="space-y-3">
          <div
            v-for="user in users"
            :key="user.id"
            class="bg-white border border-[#ECECEC] rounded-[20px] p-5 flex items-center justify-between gap-4 flex-wrap"
          >
            <div class="space-y-1">
              <p class="text-[15px] font-semibold">{{ user.username }}</p>
              <p class="text-[13px] text-[#888]">
                Бонусы: <span class="font-semibold text-black">{{ user.bonus_balance.toLocaleString() }} ₽</span>
              </p>
            </div>

            <div class="flex items-center gap-2">
              <input
                v-model.number="bonusInputs[user.id]"
                type="number"
                class="w-[110px] border border-[#E5E5E5] rounded-full px-4 py-2 text-[13px]"
              />
              <button class="px-5 py-2 bg-black text-white rounded-full text-[13px]" @click="addBonus(user.id)">
                Начислить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';

const API_URL = 'https://watches-api-c9i5.onrender.com';

const router = useRouter();
const { show, hide } = useGlobalLoader();

const orders = ref<any[]>([]);
const users = ref<any[]>([]);
const activeTab = ref<'orders' | 'users'>('orders');
const statusFilter = ref('all');
const searchPhone = ref('');
const bulkStatus = ref('');
const selectedOrders = ref<Set<string>>(new Set());
const bonusInputs = reactive<Record<string, number>>({});

const tabs = [
  { key: 'orders', label: 'Заказы' },
  { key: 'users', label: 'Пользователи' },
];

const statusFilters = [
  { value: 'all', label: 'Все' },
  { value: 'processing', label: 'В обработке' },
  { value: 'waiting_payment', label: 'Ждёт оплаты' },
  { value: 'paid', label: 'Оплачен' },
  { value: 'shipped', label: 'В доставке' },
  { value: 'completed', label: 'Выполнен' },
];

const filteredOrders = computed(() => {
  let list = orders.value;
  if (statusFilter.value !== 'all') list = list.filter((o) => o.status === statusFilter.value);
  if (searchPhone.value) list = list.filter((o) => o.phone?.includes(searchPhone.value));
  return list;
});

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const toggleOrder = (id: string) => {
  if (selectedOrders.value.has(id)) selectedOrders.value.delete(id);
  else selectedOrders.value.add(id);
};

const clearSelection = () => selectedOrders.value.clear();

const bulkUpdateStatus = async () => {
  if (!bulkStatus.value) return;
  show();
  try {
    await Promise.all(
      Array.from(selectedOrders.value).map((id) =>
        fetch(`${API_URL}/admin/orders/${id}/status`, {
          method: 'PATCH',
          headers: authHeaders(),
          body: JSON.stringify({ status: bulkStatus.value }),
        }),
      ),
    );
    orders.value.forEach((o) => {
      if (selectedOrders.value.has(o.id)) o.status = bulkStatus.value;
    });
    clearSelection();
  } finally {
    hide();
  }
};

const bulkDelete = async () => {
  if (!confirm('Удалить выбранные?')) return;
  show();
  try {
    await Promise.all(
      Array.from(selectedOrders.value).map((id) =>
        fetch(`${API_URL}/admin/orders/${id}`, {
          method: 'DELETE',
          headers: authHeaders(),
        }),
      ),
    );
    orders.value = orders.value.filter((o) => !selectedOrders.value.has(o.id));
    clearSelection();
  } finally {
    hide();
  }
};

const fetchOrders = async () => {
  const res = await fetch(`${API_URL}/admin/orders`, { headers: authHeaders() });
  if (!res.ok) router.push('/Auth/Auth');
  orders.value = await res.json();
};

const fetchUsers = async () => {
  show();
  try {
    const res = await fetch(`${API_URL}/admin/users`, { headers: authHeaders() });
    users.value = await res.json();
  } finally {
    hide();
  }
};

const updateStatus = async (id: string, status: string) => {
  await fetch(`${API_URL}/admin/orders/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
};

const deleteOrder = async (id: string) => {
  await fetch(`${API_URL}/admin/orders/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  orders.value = orders.value.filter((o) => o.id !== id);
};

const addBonus = async (userId: string) => {
  const amount = bonusInputs[userId];
  if (!amount) return;
  const res = await fetch(`${API_URL}/admin/users/${userId}/bonus`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ amount }),
  });
  const updated = await res.json();
  const user = users.value.find((u) => u.id === userId);
  if (user) user.bonus_balance = updated.bonus_balance;
  bonusInputs[userId] = 0;
};

const formatDate = (d: string) =>
  new Date(d).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const logout = () => {
  localStorage.removeItem('token');
  router.push('/Auth/Auth');
};

onMounted(async () => {
  show();
  try {
    await Promise.all([fetchOrders(), fetchUsers()]);
  } finally {
    hide();
  }
});
</script>
