Git Introduction
==========================

Setup Guide from Github
-------------------------

* [Windows Setup Git](http://help.github.com/win-set-up-git/)

	> [git for windows download](http://code.google.com/p/msysgit/downloads/list)

* [Mac Setup Git](http://help.github.com/mac-set-up-git/)
* [Linux Setup Git](http://help.github.com/linux-set-up-git/)

Advantage of git
-------------------------

The Key Steps

1. use ssh-kengen to generate ssh public key
2. copy and paste public key into your github account
3. git config setting
4. try to clone repository and do your changes


Take our gfs repository as a example

**for creator** , after create repository from Github, 

```bash
#initialize the project from local   	-> local
$ mkdir ~/gfs
$ cd ~/gfs
$ git init
$ touch README

#make some changes and first commit  	-> index/staging area
$ git add README
$ git commit -m 'first commit'

#link to remote repository				-> remote
$ git remote add origin git@github.com:activehacker/gfs.git
$ git push -u origin master
```

**for user**

```bash
$ git clone git@github.com:activehacker/gfs.git
$ cd gfs

# Make some changes then
$ git add .
$ git commit -m "Your comments"
$ git push
```


Configuration
--------------------------

```bash
#where is git configuration file
$ cat .gitconfig 
$ cat ~/.gitconfig  

#how can we change the configuration
$ git config --global user.name "jexchan"
$ git config --global user.email "jexchan@gmail.com"

#Make alias for convenience
$ git config --global alias.co checkout

#Ignoring files
$ cat ./gitignore
$ cat ~/.gitignore_global
```

Please refer to [A Collection of Useful .gitignore Templates](https://github.com/github/gitignore)


Daily steps
----------------------------

```bash
#check the status after making changes
$ git status

#staging changes
$ git add .
$ git status

#commit your changes
$ git commit -m "your comments"
$ git status

#or (automatically stage all tracked, modified files before the commit)
$ git commit -am "your comments"

#repeat this steps

#view history
$ git log

#Revert your changes
#undoing local changes (before staging)
$ git checkout master

#undoing local changes (before commiting)
$ git add .
$ git reset HEAD
$ git checkout master

#undoing committed changes
$ git add .
$ git commit -m "your comments"
$ git revert HEAD


#push to repository
$ git push


#view log history
$ git log --oneline --graph
```


Resources
----------------------

1. [Git简易指南](http://rogerdudler.github.com/git-guide/index.zh.html)
2. [Git Cheat Sheets](http://help.github.com/git-cheat-sheets//) 
3. [Pro Git](http://progit.org/) Git open source book
4. [Git Tips and Tricks](http://gitready.com/)
5. [The Git Community Book](http://book.git-scm.com/)



