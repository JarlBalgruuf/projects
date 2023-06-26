import random

# Most inefficient sorting algorithm

# Amount of numbers in array to sort
n_count = 9

def is_sorted(list):
    previous = list[0]
    for number in list:
        if number < previous:
            return False
        previous = number
    return True

def bogosort(arr):
    bArr = list(arr)
    sorted = True
    count = 0
    print("Initializin bogosort for array: " + str(arr))
    while True:
        sorted = is_sorted(arr)
        if count == -1:
            print(str(count) + " overload cancelling sorting algorithm!")
            return False, count
        elif  sorted == True:
             print("It took [" + "{:,}".format(count).replace(',', ' ') + "] times to sort by bogosort. "+"\n"+ "Order of array is: " + str(arr) + "\n" + "Start array: " + str(bArr))
             return True, count
        random.shuffle(arr)
        count+=1
        if (count % 100) == 0:
            print("logging: " + str(count) + "...")

def numbers(arrLen):
    nums = []
    for x in range(arrLen):
        x = random.randrange(-99, 99)
        nums.append(x)
    return nums

def avg(n):
    length = n
    nums = numbers(length)
    bogosort(nums)

avg(n_count)