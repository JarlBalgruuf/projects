import random
import PySimpleGUI as sg

# Simple RPS game with PySimpleGUI

def rps():
    event, values = window.read()
    ls = ["Rock", "Paper", "Scissors"]
    ch = sCase(event)

    if ch == 404 or event == sg.WIN_CLOSED:
       return 404

    if ch >= 1 and ch <= 3:
        npc = random.randrange(1,3)
        print("Your choice is: " + ls[ch-1] + " NPC chose: " + ls[npc-1])
        window["-PRINT-"].update("Your choice is: " + ls[ch-1] + " NPC chose: " + ls[npc-1])
        if ch == npc:
            print("It's a TIE!")
            window["-TEXT-"].update("It's a TIE!")
            wl[2] = wl[2] + 1
        else:
            if (ch == 1 and npc == 3) or (ch == 2 and npc == 1) or (ch == 3 and npc == 2):
                print("You WIN!")
                wl[0] = wl[0]+1
                window["-TEXT-"].update("You WIN!")
            else:
                print("You LOSE!")
                wl[1] = wl[1]+1
                window["-TEXT-"].update("You LOSE!")
        print("W/L: " + str(wl[0]) + "/" + str(wl[1]))
        window["-STATS-"].update("W/L/T: " + str(wl[0]) + "/" + str(wl[1]) + "/" + str(wl[2]))
    else:
        print("_____Invalid input______")

def sCase(arg):
    match arg:
        case "Rock":
            return 1
        case "Paper":
            return 2
        case "Scissors":
            return 3
        case "EXIT":
            return 404
        case default:
            return 0


#-Main-
layout = [[sg.Text("", key="-PRINT-")], [sg.Text("Rock Paper Scissors. Make you choice!", key="-TEXT-")], [sg.Text("", key="-STATS-")], [sg.Button("Rock"), sg.Button("Paper"), sg.Button("Scissors")], [sg.Button("EXIT")]]
window = sg.Window("RPS", layout)
wl = [0, 0, 0]
while True:
    if rps() == 404:
        break
    