import { handleError, logCatch } from '@/lib/errorCore';

const { Redis } = require('@upstash/redis');
require('dotenv').config({ path: '.env.local' });
const crypto = require('crypto');

// Upstash Redis Connection Config
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

/**
 * Görevi (Job) belirtilen kuyruğa ekler.
 */
async function KuyrugaEkle(queueName, jobData) {
    try {
        const dataString = JSON.stringify({
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            data: jobData,
            status: 'bekliyor'
        });
        const length = await redis.lpush(queueName, dataString);
        console.log(`[REDIS] Görev eklendi. Kuyruk: ${queueName}, Uzunluk: ${length}`);
        return length;
    } catch (error) {
        handleError('ERR-SYS-LB-105', 'src/lib/redis_kuyruk.js', error, 'orta');
        throw error;
    }
}

/**
 * Belirtilen kuyruktan işlenecek ilk görevi alır (Listeden çıkarır).
 */
async function KuyruktanAl(queueName) {
    try {
        // FIFO yapısı
        const jobString = await redis.rpop(queueName);
        if (!jobString) return null;
        return JSON.parse(jobString);
    } catch (error) {
        handleError('ERR-SYS-LB-105', 'src/lib/redis_kuyruk.js', error, 'orta');
        return null;
    }
}

async function KuyrukUzunlugu(queueName) {
    try {
        return await redis.llen(queueName);
    } catch (error) {
        handleError('ERR-SYS-LB-105', 'src/lib/redis_kuyruk.js', error, 'orta');
        return 0;
    }
}

module.exports = {
    KuyrugaEkle,
    KuyruktanAl,
    KuyrukUzunlugu
};
