import sys
int a,b = map(int, sys.stdin.readline.split())

count=1
while b>a:
    if b%2==0: #b가 짝수라면(2로 나눈 나머지가 0이라면)
        b//=2 # b를 2로 나눈 몫으로 바꾼다(이전 단계로 되돌림)
        count +=1 # 연산이 한 번 일어났으므로 횟수 추가 
        