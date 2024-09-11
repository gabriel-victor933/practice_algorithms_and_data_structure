class Stack {
    items: any[]
    constructor(){
        this.items = []
    }

    push(...elements: any){
        elements.forEach((ele: any) => this.items.push(ele))
    }

    pop(){
        return this.items.pop()
    }

    peek(){
        return this.items[this.items.length - 1];
    }

    isEmpty(){
        return this.items.length === 0
    }

    clear(){
        this.items = []
    }

    size(){
        return this.items.length
    }
}

class StackObj {
    private count: number
    items: {[key: number]: any}
    constructor(){
        this.count = 0
        this.items = {}
    }

    push(element: any){
        this.items[this.count] = element
        this.count += 1
    }

    size(){
        return this.count
    }

    isEmpty(){
        return this.count === 0
    }

    pop(){
        if(this.isEmpty()) return undefined

        this.count -= 1
        const temp = this.items[this.count]
        delete this.items[this.count]        

        return temp
    }

    peek(){
        if(this.isEmpty()) return undefined

        return this.items[this.count - 1]
    }

    clear(){
        this.items = {}
        this.count = 0
    }

    toString(){
        if(this.isEmpty()) return ''

        let objString = `${this.items[0]}`
        for(let i = 1; i < this.count; i++){
            objString = `${objString}, ${this.items[i]}`
        }
        return objString
    }
}


function decimalToBin(dec: number){

    const binStack = new Stack()
    
    while(dec / 2 != 0){
        let rest = dec%2
        binStack.push(rest)
        dec = Math.floor(dec/2);
    }

    let result = ''
    while(!binStack.isEmpty()){
        result += `${binStack.pop()}`
    }

    return result 
}


function validParentheses(s: string){
    const caracters = s.split('')
    const stack:{[key: number]: string}  = {}
    let count = 0

    const complement: {[key: string]: string} = {
        ')': '(',
        ']': '[',
        '}': '{',
    }

    for(let caracter of caracters){

        if(['(','[','{'].includes(caracter)) {
            stack[count] = caracter
            count += 1;
            continue
        }

        count -= 1
        const last = stack[count]

        if(last != complement[caracter]) return false
    }

    if(count != 0) return false

    return true
}

function firstUniqChar(s: string): number {
    const arr = s.split('')
    const memory: {[key:string]: boolean} = {}

    for(let i = arr.length -1; i >= 0; i-- ){

        if(memory[arr[i]]) memory[arr[i]] = false

        if(memory[arr[i]] == undefined) memory[arr[i]] = true
        
    }

    for(let i = 0; i < arr.length; i++){
        if(memory[arr[i]]) return i
    }

    return -1
};

class RecentCounter {
    count: number[]
    constructor() {
        this.count = []
    }

    ping(t: number): number {
        this.count.push(t)
        const min = t - 3000
        return this.count.filter((old) => (old <= t && old >= min )).length
    }
}

class Queue {
    count: number
    lowestCount: number
    items: {[key: number]: string}
    constructor(){
        this.count = 0;
        this.lowestCount = 0;
        this.items = {}
    }

    isEmpty(){
        return this.count - this.lowestCount === 0 
    }

    enqueue(element: any){
        this.items[this.count] = element
        this.count += 1
    }

    dequeue(){

        if(this.isEmpty()) return undefined

        const element = this.items[this.lowestCount]

        delete this.items[this.lowestCount]

        this.lowestCount += 1

        return element
    }

    peek(){
        if(this.isEmpty()) return undefined

        return this.items[this.lowestCount]
    }

    size(){
        return this.count - this.lowestCount
    }

    clear(){
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }
}

class Deck {
    private count: number
    private lowestCount: number
    items: {[key: number]: any}
    constructor(){
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }

    isEmpty(){
        return this.count - this.lowestCount === 0 
    }

    size(){
        return this.count - this.lowestCount
    }

    clear(){
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }

    addFront(element: any){
        if(this.isEmpty()) {
            this.addBack(element)
            return
        } 
        this.lowestCount -= 1
        this.items[this.lowestCount] = element
        
    }

    addBack(element: any){
        this.items[this.count] = element
        this.count += 1
    }

    removeFront(){
        const element = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount += 1
        return element
    }

    removeback(){
        this.count -= 1
        const element = this.items[this.count]
        delete this.items[this.count]
        return element
    }

    peekFront(){
        return this.items[this.lowestCount]
    }

    peekback(){
        return this.items[this.count-1]
    }
}

function hotPotato(list: string[], num: number){
    const queue = new Queue()

    for(let i = 0; i < list.length; i++){
        queue.enqueue(list[i])
    }

    while(queue.size() > 1){

        for(let i = 0; i < num; i++){
            queue.enqueue(queue.dequeue())
        }

        const lost = queue.dequeue()
        console.log(`${lost} have lost`)
    }

    console.log(`${queue.dequeue()} is the winner!`)
}

function palindromeChecker(str: string){
    const deque = new Deck()

    for(let i = 0; i < str.length; i++){
        deque.addBack(str.charAt(i))
    }

    while(deque.size() > 1){
        if(deque.removeFront() !== deque.removeback()){
            return false
        }
    }

    return true
}

// CAP 8 - DICIONARIOS E HASHES

export default class Dictionary {
    table: {[key: string | number | symbol]: any}
    constructor(){
        this.table = {}
    }

    set(key: string | number | symbol, value: any ){
        this.table[key] = value;
    }

    remove(key: string | number | symbol){
        delete this.table[key]
    }

    hasKey(key: string | number | symbol){
        return !!this.table[key]
    }

    get(key: string | number | symbol){
        return this.table[key]
    }               
    
    clear(){
        this.table = {}
    }

    size(){
        return Object.keys(this.table).length
    }

    isEmpty(){
        return this.size() === 0
    }

    keys(){
        return Object.keys(this.table)
    }

    values(){
        return Object.values(this.table)
    }

    keyValues(){
        return Object.entries(this.table)
    }

    forEach(callBackFn: Function){
        for(const [key, value] of this.keyValues()){
            if(!callBackFn(key,value)) return
        } 
    }
}


//funcao de hash djb2

function djb2HashCode(key: string){
    let hash = 5381
    for(let i = 0; i < key.length; i++){
        hash = (hash*33) + key.charCodeAt(i)
    }

    return hash%1013
}


function majorityElement3(nums: number[]): number | undefined {
    const hash: {[key: number]: number} = {}

    if(nums.length == 1) return nums[0]

    for(let num of nums){
        if(hash[num]) {
            hash[num] += 1
            if(hash[num] > nums.length/2) return num
            continue
        }

        hash[num] = 1
    }
    

};

function majorityElement2(nums: number[]): number | undefined {
    const hash: {[key: number]: number} = {}

    for(let num of nums){
        if(hash[num]) {
            hash[num] += 1
            continue
        }

        hash[num] = 1
    }
    
    for(let [key,value] of Object.entries(hash)){
        if(value > nums.length/2) return parseInt(key)
    }

};

function majorityElement(nums: number[]): number | undefined {
    let number;
    let count = 0;

    for(let i = 0; i < nums.length; i++){
        if(count == 0) {
            number = nums[i]
            count += 1
            continue
        }
        count += (number === nums[i]) ? 1 : -1 
    }

    return number
};


function isIsomorphic(s: string, t: string): boolean {
    const hash: {[key: string]: string} = {}
    const hashback: {[key: string]: string} = {}

    for(let i = 0; i < s.length; i++){
        
        if(!hash[s.charAt(i)] && !hashback[t.charAt(i)]) {
            hash[s.charAt(i)] = t.charAt(i)
            hashback[t.charAt(i)] = s.charAt(i)
            continue
        }
        
        if(hash[s.charAt(i)] !== t.charAt(i)) return false
    }
    
    return true
};

function containsDuplicate(nums: number[]): boolean {
    const hash: {[key: number]: boolean} = {}

    for(let num of nums){
        if(hash[num]) return true

        hash[num] = true
    }

    return false
};

function isHappy(n: number, control: {[key: number]: boolean} ={}): boolean {
    let number = n
    let  sum = 0
    while(number >0){
        let dig = number%10;

        number = (number - dig)/10

        console.log(dig)
        sum += dig*dig
    }
    

    if(sum == 1) return true

    if(control[sum]) return false

    control[sum] = true

    return isHappy(sum, control)
};

function wordPattern(pattern: string, s: string): boolean {
    const hash: {[key: string]: string} = {}
    const hashBack: {[key: string]: string} = {}
    const arr = s.split(' ')

    if(pattern.length !== arr.length) return false
    
    for(let i = 0; i < arr.length; i++){

        if(!hash[pattern.charAt(i)] && !hashBack[arr[i] + '1']) {
            hash[pattern.charAt(i)] = arr[i]
            hashBack[arr[i] + "1"] = pattern.charAt(i)
            continue
        }

        if(hash[pattern.charAt(i)] !== arr[i]) return false
    }

    return true
};

function intersection(nums1: number[], nums2: number[]): number[] {
    const hash:{[key: number]: boolean} = {}
    const hashRes:{[key: number]: number} = {}

    for(let num of nums1){
        hash[num] = true
    }

    for(let num of nums2){
        if(hash[num]) hashRes[num] = num
    }

    return Object.values(hashRes)
};

const randomList = [1,7,4,6,18,5,62,9,8,3]

function bubbleSort(lists: number[]){

    for(let i = 0; i < lists.length; i++){
        for(let j = 0; j < lists.length-1-i; j++){

            if(lists[j] >= lists[j+1]){
                const temp = lists[j+1]
                lists[j+1] = lists[j]
                lists[j] = temp
            }
        }
    }

    return lists
}

console.time('bubbleSort')
const list = bubbleSort(randomList)
console.log(list)
console.timeEnd('bubbleSort')

function selectionSort(list: number[]) {

    for (let i = 0; i < list.length - 1; i++) {

        let minIndex = i

        for (let j = i + 1; j < list.length; j++) {
            if (list[minIndex] > list[j]) minIndex = j
        }

        if (i != minIndex) {
            const temp = list[i]
            list[i] = list[minIndex]
            list[minIndex] = temp
        }

    }

    return list
}

console.time('selectionSort')
const list2 = selectionSort(randomList)
console.log(list2)
console.timeEnd('selectionSort')

function insertionSort(list: number[])