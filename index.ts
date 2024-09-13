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
const list = bubbleSort([...randomList])
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
const list2 = selectionSort([...randomList])
console.log(list2)
console.timeEnd('selectionSort')

function insertionSort(list: number[]){

    for (let i = 1; i < list.length; i++) {
        for(let j = i; j > 0; j--){
            if(list[j-1] <= list[j]) break

            const temp = list[j-1]
            list[j-1] = list[j]
            list[j] = temp
        }
        
    }

    return list
}

console.time('insertionSort')
const list3 = insertionSort([...randomList])
console.log(list3)
console.timeEnd('insertionSort')

function mergeSort(list: number[]): number[]{
    if(list.length <= 1) return list

    const middle = Math.floor(list.length/2)

    const left = mergeSort(list.slice(0,middle))
    const right = mergeSort(list.slice(middle,list.length))

    return merge(left,right)
}

function merge(left: number[], right: number[]){

    let i = 0
    let j = 0
    const result: number[] = []
    while(i < left.length && j < right.length){
        const least = left[i] < right[j] ? left[i++] : right[j++]
        result.push(least)
    }

    return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

console.time('mergeSort')
const list4 = mergeSort([...randomList])
console.log(list4)
console.timeEnd('mergeSort')

/* function quicksort(list: number[]){
    return quick(list,0,list.length-1)
}

function quick(list: number[], left: number, right: number){
    if(list.length <= 1) return list

    let index = partition(list,left,right)

    if(left < index -1){
        quick(list,left,index-1)
    }

    if(right > index){
        quick(list,index,right)
    }

    return list
}

function partition(list: number[], left: number, right: number): number{
    const pivot = list[Math.floor((left + right)/2)]
    let i = left
    let j = right

    while(i <= j){
        while(list[i] < pivot){
            i++
        }

        while(list[j] > pivot){
            j--
        }

        if(i <= j){
            const temp = list[i]
            list[i] = list[j]
            list[j] = temp

            i++
            j--
        }
    }

    return i
} */

/* console.time('quickSort')
const list5 = quicksort([3,5,1,6,4,7,2])
console.log(list5)
console.timeEnd('quickSort') */

function countingSort(list: number[]){
    if(list.length < 2) return list

    const maxValue = findMaxValue(list)
    console.log(maxValue)
    const counts = new Array(maxValue+1)

    list.forEach((ele) => {
        if(!counts[ele]){
            counts[ele] = 0
        }
        counts[ele] += 1
    })

    let sortedIndex = 0

    counts.forEach((count,i) => {
        while(count > 0){
            list[sortedIndex++] = i
            count--
        }
    })

    return list
}

function findMaxValue(list: number[]){
    let max = -Infinity
    for(let i = 0; i < list.length; i++){
        if(list[i] > max) max = list[i]
    }
    return max
}

function findMinValue(list: number[]){
    let min = Infinity
    for(let i = 0; i < list.length; i++){
        if(list[i] < min) min = list[i]
    }
    return min
}

console.time('countingSort')
const list6 = countingSort([...randomList])
console.log(list6)
console.timeEnd('countingSort')

function bucketSort(list: number[], bucketSize = 5){
    if(list.length <= 1) return list

    const buckets = createBuckets(list,bucketSize)
    return sortBuckets(buckets)
}

function createBuckets(list: number[], bucketSize: number){
    let minValue = list[0]
    let maxValue = list[0]

    for(let i = 1; i < list.length; i++){
        if(list[i] < minValue){
            minValue = list[i]
        }
        if(list[i] > maxValue){
            maxValue = list[i]
        }
    }

    const bucketCount = Math.floor((maxValue - minValue)/bucketSize)+1

    const buckets: number[][] = []
    for(let i = 0; i < bucketCount; i++){
        buckets[i] = []
    }

    for(let i = 0; i < list.length; i++){
        const bucketIndex = Math.floor((list[i] - minValue)/bucketSize)
        buckets[bucketIndex].push(list[i])
    }
    return buckets
}

function sortBuckets(buckets: number[][]){
    const sortedArray: number[] = []

    for(let i = 0; i < buckets.length; i++){
        if(buckets[i] != null){
            insertionSort(buckets[i])
        }
        sortedArray.push(...buckets[i])
    }

    return sortedArray
}

console.time('bucketSort')
const list7 = bucketSort([...randomList],3)
console.log(list7)
console.timeEnd('bucketSort')

function radixSort(list: number[], radixBase=10){
    if(list.length <= 1) return list

    const maxValue = findMaxValue(list)
    const minValue = findMinValue(list)

    let significantDigit = 1

    while((maxValue - minValue)/significantDigit >= 1){
        list = countingSortForRadix(list,radixBase,significantDigit,minValue)
        significantDigit *= radixBase
    }

    return list
}

function countingSortForRadix(list: number[], radixBase: number, significantDigit: number, minValue: number){
    let bucketIndex;
    const buckets: number[] = []
    const aux: number[] = []

    for(let i = 0; i < radixBase; i++){
        buckets[i] = 0
    }

    for(let i = 0; i < list.length; i++){
        bucketIndex = Math.floor(((list[i] - minValue)/significantDigit)%radixBase)
        buckets[bucketIndex]++
    }

    for(let i = 1; i < radixBase; i++){
        buckets[i] += buckets[i-1]
    }

    for(let i = list.length -1; i >= 0; i--){
        bucketIndex = Math.floor(((list[i] - minValue)/significantDigit)%radixBase)
        aux[--buckets[bucketIndex]] = list[i]
    }

    for(let i =0; i < list.length; i++){
        list[i] = aux[i]
    }
    return list
}

console.time('radixSort')
const list8 = radixSort([...randomList],3)
console.log(list8)
console.timeEnd('radixSort')

function binarySearch(list: number[], search: number){

    let middle = Math.floor(list.length/2)
    let min = 0
    let max = list.length

    while(min <= max){

        if(list[middle] == search){
            return middle
        }

        if(search > list[middle]){
            min = middle + 1
        }

        if(search < list[middle]){
            max = middle - 1

        }

        middle = Math.floor((max + min)/2)
    }

    return -1
}   

console.time('BinarySearch')
console.log(binarySearch([1,2,3,4,5,6,7,8],6))
console.timeEnd('BinarySearch')

function interpolationSearch(list: number[], search: number){
    let low = 0
    let high = list.length - 1

    while(low <= high && search >= list[low] && search <= list[high]){
        let delta = (search - list[low])/(list[high] - list[low])
        let position = low + Math.floor((high - low)*delta)
        if(list[position] == search){
            return position
        }

        if(list[position] < search){
            low = position + 1
        } else {
            high = position - 1
        }
    }

    return -1
}   

console.time('interpolationSearch')
console.log(interpolationSearch([1,2,3,4,5,6,7,8],6))
console.timeEnd('interpolationSearch')


function shuffle(list: number[]){
    for(let i = list.length -1; i > 0; i-- ){
        const randomIndex = Math.floor(Math.random()*(i+1))
        const temp = list[i]
        list[i] = list[randomIndex]
        list[randomIndex] = temp
    }
    return list
}

console.log(shuffle([1,2,3,4,5,6,7,8,9,10]))


function minimumAverage(nums: number[]): number {
  
    const sortedArray = quickSort(nums)
    
    let minAverage: number = +Infinity

    for(let i = 0; i < sortedArray.length/2; i++){
        const average = (sortedArray[i] + sortedArray[sortedArray.length - 1 - i])/2

        if(average < minAverage) minAverage = average
    }

    return minAverage
};

function quickSort(list: number[]){
    return quick(list, 0, list.length -1)
}

function quick(list: number[], left: number, right: number){
    if(list.length <= 1) return list
    
    const index = partition(list,left, right)

    if(left < index -1){
        quick(list,left,index-1)
    }

    if(right > index){
        quick(list,index,right)
    }


    return list
}


function partition(list: number[], left: number, right: number){

    const pivot = list[Math.floor((right + left)/2)]
    let i = left
    let j = right

    while(i <= j){

        while(list[i] < pivot){
            i++
        }

        while(list[j] > pivot){
            j--
        }

        if(i <= j){

            let temp = list[i]
            list[i] = list[j]
            list[j] = temp

            i++
            j--
        }
    }

    return i
}

console.log('Minimum Average')
console.log(minimumAverage([7,8,3,4,15,13,4,1]))

function minimumBoxes(apple: number[], capacity: number[]): number {
    const sortedCapacity = capacity.sort((a,b) => b-a)
    let totalApples = apple.reduce((acc,cur) => cur + acc,0)
    let usedBoxes = 0
    
    while(totalApples > 0){
        totalApples -= sortedCapacity[usedBoxes]
        usedBoxes++
    }
    return usedBoxes
};

console.log('minimumBoxes')
console.log(minimumBoxes([1,3,2], [4,3,1,5,2]))
console.log(minimumBoxes([5,5,5], [2,4,2,7]))

function minimumCost(nums: number[]): number {
    //achar os 3 menores valores 

    const least = new Array(nums[0],Infinity,Infinity)

    least[0] = nums[0]

    for(let i = 1; i < nums.length; i++){

        if(nums[i] < least[1]){
            let temp = least[1]
            least[1] = nums[i]

            if(temp < least[2]) least[2] = temp
            continue
        }

        if(nums[i] < least[2]) least[2] = nums[i]
    }
    
    return least.reduce((acc,cur) => acc + cur,0)
};

console.log('minimumCost')
console.log(minimumCost([1,6,49,35,41,4,31,39,36,39]))

function missingInteger(nums: number[]): number {
    
    let aux = [nums[0]]
    let max = 0
    let longest = [nums[0]]

    for(let i = 1; i < nums.length; i++){
        if(nums[i] === nums[i-1] + 1){
            aux.push(nums[i])

            if(max < aux.length) {
                max = aux.length
                longest = [...aux]
            }
        } else {
            break
        }
    }
    
    let missing = longest.reduce((acc,cur) => acc + cur, 0)
    
    while(nums.includes(missing)) missing++

    return missing
};

console.log('missingInteger')
console.log(missingInteger([1,2,3,2,5]))
console.log(missingInteger([3,4,5,1,12,14,13]))
console.log(missingInteger([38]))
console.log(missingInteger([37,1,2,9,5,8,5,2,9,4]))
