Git Introduction
==========================

Setup Guide from Github
-------------------------

* [Windows Setup Git](http://help.github.com/win-set-up-git/)

	> [git for windows download](http://code.google.com/p/msysgit/downloads/list)

* [Mac Setup Git](http://help.github.com/mac-set-up-git/)
* [Linux Setup Git](http://help.github.com/linux-set-up-git/)


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

#make some changes and first commit  	-> index
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
