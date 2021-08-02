# DeFiWiki  system overview & tokenomics

 ### Glossary
 - *staking amount* - amount of WIK tokens that is necessary to stake, to raise a challenge or become an *editor*. Different sections can have different *staking amounts* associated with them. However, *staking amount* for a specific section is the same for all wiki pages. (e.g. abstract section has staking amount of 100 WIK accross all wiki pages)
 - *dispute period* - time period in which *maintainer* can dispute a *challenge*. Could be different for different sections. 
	 
** Actors in the system: ** 
 - ***editors*** - edit and update content. Anybody can become an *editor*, they lock WIK tokens.
	 - *maintainer* - *editor* who is currently responsible for correctness of specific section. 
 - *challenger* - *editor* who challenges current *maintainer*
 - ***voters*** - ensure that conflict between *editors*  regarding correct content are resolved 

### Incentives needed
These are the behaviours that our mechanism needs to incentivize

- wiki pages
	- creation
	- editing

- creation
	- *We* (DAO in the future) create / authorize wiki pages(can be a page with blank sections) for projects and let community(WIK token holders) edit. 
- editing
	- *Editors* edit section of various wiki pages. There is always only one editor for each section. If section has no editor(is new) anybody can become editor, by creating a challenge for the section(see challenge below). Anybody can also become an editor by challenging a section already maintained by other editor if sufficient conditions are met(see challenge section) and providing sufficient stake. 

### Wiki page structure & incentives

Every wiki is divided into sections 
There is always a rewards stream for every section of the wiki page. This stream goes to the *maintainer* who is the last *editor*  who successfully challenged the section content. This incentivizes editors to both:
1. Make sure their content is always up to date and cannot be challenged.
(if it is not and is challenged successfully the staking rewards from challanged section starts flowing to the challenger who effectively becomes the new editor for the specified section.)
2. Incentivizes editors to look for mistakes / inconsistencies in contents of wiki pages. If they find it, they can challenge it and start receiving staking rewards themselves. 
3. This mechanism lets editors specialize both horizontally or vertically
	1. horizontal specialization
		1. example
			1. editor specializes in updating TVL for all defi projects by running a bot which pulls the data off the blockchain / website
	2. vertical specialization
		1. editor specializes in updating specific wiki page, he is part of synthetix community, so knows all the newest info about new products, roadmap etc. 
			

			
	### Token distribution
WIK tokens need to be initially distributed amongst large group of potential community members. Initial distribution of token needs to target communities various DeFi communities. The goal here is to get token into the hands of content creators(editors), voters and broader defi community potentially interested in consuming the content.   
	
 Every actor who wants to actively participate in content creation or curation needs WIK token to participate. This is because every party needs to put up stake in order to participate to ensure good behaviour and have a threat of loss funds. 
 

 ### Structure of the system
-	There is always **only one wiki page** for a specific DeFi project
	-	Adding / removing of wiki pages is managed by the core team, later by dao
-	Every wiki page is divided into ***sections***
	-	Adding / removing of *sections* is managed by the core team, later by dao
	-	Sections should be clearly defined in scope, if information belongs to a different section, it can and should be challenged
	 
### Actions in the system
1. Staking => *editor* can start staking and become *maintainer*, person responsible for the correctness of a specific section. He can do so by successfully challanging section content and locking appropriate *staking amount*. There is a revenue stream associated with every section which goes to the *maintainer*. Revenue stream for every section should be directly proportional to the locked stake that is required for its maintenence. However, different sections could have a different required stake. This can be necessary because certain sections need more maintanence(more frequent updates) than others. (TVL section vs project abstract). Staking terminates whenever there is a successful challange or when current *maintainer* decides to unstake. There is a time delay of 1 week after unstaking. This is so in order to allow anyone to challange the content and prevent editors from publishing bad content for which they cannot be punished. 
2. challenge => to challenge a wiki page section *editor* needs to lock *staking amount* in the contract. This mechanism would be similar to UMA challenge rounds in optimistic oracle. 
	1. challenge created => challenger, locks *staking amount* to create a challenge, specifies the section he is challenging by submitting the updated section content. He needs to provide all the links / resources (if needed) for the voters to make a decision if his challenge is refused and goes to vote. Challenge can be of two types:
		1. without slashing - (small mistakes, content updates) 
		2. with slashing - (misinformation, serious mistakes that make the content detremental to its consumers, in such case chalenger always become *maintainer*).   
	2. challenge is live => time in which *maintainer* can refuse it.
		1.  challenge is accepted (by *maintainer* or if not disputed within the *dispute period*)
		2.  challenge is disputed by *maintainer* (needs to be done within *dispute period* otherwise it is accepted automatically)
			1.  Voting begins after *some time*(to be specified) after challenge is disputed. WIK token holders are notified to vote with their WIK tokens to decide. See *Voting* section below. 



### Challenge
Every challenge has two parts. 
1.  submission of new content of section of wiki page
2.  type of challenge => this is neccessary to determine if current editor needs to be slashed. The challenge could be outdated text, incomplete or slightly incorrect information or missing reference to a particular resource. We want to encourage all changes that improve the system and punish only those which are pontetially harmfull or obviously misleading and degrade the system for the consumers. 
Types of changes:
	1.  **small mistakes, content updates** for which challenged party should not be slashed. There needs to be a treshold for how old can data be and still be valid, since various price data are old the moment they are updated. Only data which is outdated for more than a specified time period (e.g. an hour) can be challanged. *maintainer* whose section is challenged because it is  outdated should not be slashed. There also could be different time periods for different sections. e.g. It makes sens for *price* section can be challenged sooner than *abstract* section. 
		1.  no slashing
		2.  loss of future rewards stream
	2.  incorrect information => big mistakes that should be punished, misleading information, or mistakes that make the content unusable. 
		1.  slashing
		2.  loss of future rewards stream

#### Voting
Voting takes place every time when these conditions are met: 
- section is challenged
- challenge is refused by current editor 
##### flow 
1. section is challenged 
	1. requirements: 
		- challenger must lock in required *staking amount*
2. challange is refused => **Voting is on!**
This smart contract interaction notifies WIK token holders of the open challange. This could be done via DeFiWiki website or various other channels.

- There is one week voting period in which token holder can vote by locking WIK token into the voting contract
- Every vote is weghted by amount of WIK tokens locked
- Every vote has a winner and a looser(*challenger* vs *maintainer*), winning voters and possibly losing voters
	-  **Challenger wins**
		-  if more than 66% WIK tokens are behind the vote (not 50% to incentivize challengers to challenge clear cases, not something they *might* win)
		-  **consequences**
			-  Challenger
				-  becomes *maintainer* and receives future section rewards stream
				-  IF slashing challenge 
					-  receives 50% of section stake 
			-  challenged *maintainer*
				-  loss of future section rewards stream
				-  IF slashing challenge 
					-  loses 100% of *staking amount*
			-  Winner voters
				-  protocol mints *low* reward  (to be specified exact amount) * number of locked tokens to their accounts
				-  IF slashing challenge
					-  protocol mints *high* reward  (to be specified exact amount) * number of locked tokens to their accounts
			-  Loser voters
				-  protocol burns 25% locked WIK for vote
				-  IF slashing challenge
					-  burn all locked WIK for vote (idea here is to discurage rogue voting, that is the worst thing that may happen)
	-   **Challenger loses**
		-  if less or equal than 66% WIK tokens are behind the vote (not 50% to incentivize challengers to challenge clear cases, not something they *might* win)
		-  **consequences**
			-  Challenger
				-  loses *small* amount from stake (to discourage spam / superfluose challenges)
				-  IF slashing challenge 
					-  loses 100% of *staking amount* (content should never be challanged for slashing, if the information provided is not seriously flawed or misleading)
			-  challenged *maintainer*
				-  (? should there be any reward for challenged here?)
				-  IF slashing challenge 
					-   (? should there be any reward for challenged here?)
			-  Winner voters
				-  protocol mints *low* reward  (to be specified exact amount) * number of locked tokens to their accounts
				-  IF slashing challenge
					-  protocol mints *high* reward  (to be specified exact amount) * number of locked tokens to their accounts
			-  Loser voters
				- protocol burns 25% locked WIK for vote
				-  IF slashing challenge
					-  burn all locked WIK for vote (idea here is to discurage rogue voting, that is the worst thing that may happen)

