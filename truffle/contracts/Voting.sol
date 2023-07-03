// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";


/**
* @title Voting
* @dev Contrat pour la réalisation d'un vote
 */
contract Voting is Ownable {

    uint public winningProposalID;
    
    /**
    * @dev Structure pour un électeur
    * @param isRegistered booléen pour savoir si l'électeur est enregistré
    * @param hasVoted booléen pour savoir si l'électeur a voté
    * @param votedProposalId id de la proposition pour laquelle l'électeur a voté
     */
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    /**
    * @dev Structure pour une proposition
    * @param description description de la proposition
    * @param voteCount nombre de votes pour la proposition
    */
    struct Proposal {
        string description;
        uint voteCount;
    }

    /**
    * @dev Enum pour les différents états du vote
    * @param RegisteringVoters état pour l'enregistrement des électeurs
    * @param ProposalsRegistrationStarted état pour l'enregistrement des propositions
    * @param ProposalsRegistrationEnded état pour la fin de l'enregistrement des propositions
    * @param VotingSessionStarted état pour le début de la session de vote
    * @param VotingSessionEnded état pour la fin de la session de vote
    * @param VotesTallied état pour le décompte des votes
     */
    enum  WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    /** 
    * @dev Status du workflow
    * @notice workflowStatus état du workflow
    * @notice proposalsArray tableau des propositions
    * @notice voters mapping des électeurs
     */
    WorkflowStatus public workflowStatus;
    Proposal[] proposalsArray;
    mapping (address => Voter) voters;
    
    /*
    * @param VoterRegistered évènement pour l'enregistrement d'un électeur
    * @param WorkflowStatusChange évènement pour le changement d'état du workflow
    * @param ProposalRegistered évènement pour l'enregistrement d'une proposition
    * @param Voted évènement pour le vote d'un électeur
    */
    event VoterRegistered(address voterAddress); 
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted (address voter, uint proposalId);
    
    /**
    * @dev Modificateur pour vérifier si l'adresse est bien un électeur
     */
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }
    
    // ::::::::::::: GETTERS ::::::::::::: //


    /**
    * @dev Renvoie les informations de l'électeur pour l'adresse donnée.
    * @param _addr Adresse de l'électeur
    * @return Voter les informations de l'électeur
     */
        function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }
    
    /**
    * @dev Renvoie le nombre de propositions.
    * @return uint le nombre de propositions
     */
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

 
    // ::::::::::::: REGISTRATION ::::::::::::: // 

    /**
    * @dev Enregistre un électeur.
    * @param _addr Adresse de l'électeur
    * @notice require pour vérifier que l'enregistrement des électeurs est ouvert
    * @notice require pour vérifier que l'électeur n'est pas déjà enregistré
     */
    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');
    
    /**
    * @param VoterRegistered évènement pour l'enregistrement d'un électeur
     */
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }
 

    // ::::::::::::: PROPOSAL ::::::::::::: // 

    /**
    * @dev Ajoute une proposition.
    * @param _desc Description de la proposition
    * @notice require pour vérifier que l'enregistrement des propositions est ouvert
    * @notice require pour vérifier que la description n'est pas vide
     */
    function addProposal(string calldata _desc) external onlyVoters {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'Vous ne pouvez pas ne rien proposer'); // facultatif

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length-1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /**
    * @dev Vote pour une proposition.
    * @notice require pour vérifier que la session de vote est ouverte
    * @notice require pour vérifier que l'électeur n'a pas déjà voté
    * @notice require pour vérifier que la proposition existe
    * @param _id id de la proposition
    * @notice = true si le vote a été pris en compte
    * @notice incrémente le nombre de votes pour la proposition
    * @notice Voted évènement pour le vote d'un électeur
    */
    /* function setVote( uint _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found'); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    } */

    function setVote(uint _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found');

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        // Correction de la faille DOS, en settant la WinningProposalId à chaque vote
        // rend obsolète la boucle dans la fonction TallyVote()
        // Avec le call de WinningProposalId, on obtient directement l'information
        uint previousWinnerID = winningProposalID;
        uint previousVoteCount = proposalsArray[previousWinnerID].voteCount;
        if (proposalsArray[_id].voteCount > previousVoteCount) {
            winningProposalID = _id;
        }

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //

    /**
    * @dev startVotersRegistration démarre l'enregistrement des électeurs.
    * @notice require pour vérifier que le workflow est à l'étape RegisteringVoters
    * @notice change le workflow à l'étape VotersRegistrationStarted
    */
    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Registering proposals cant be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        
        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);
        
        /**
        * @param WorkflowStatusChange évènement pour le changement d'étape du workflow
         */
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    /**
    * @dev endVotersRegistration termine l'enregistrement des électeurs.
    * @notice require pour vérifier que le workflow est à l'étape VotersRegistrationStarted
    * @notice change le workflow à l'étape VotersRegistrationEnded
     */
    function endProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Registering proposals havent started yet');
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    /**
    * @dev startVotingSession démarre la session de vote.
    * @notice require pour vérifier que le workflow est à l'étape ProposalsRegistrationEnded
    * @notice change le workflow à l'étape VotingSessionStarted
     */
    function startVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, 'Registering proposals phase is not finished');
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    /**
    * @dev endVotingSession termine la session de vote.
    * @notice require pour vérifier que le workflow est à l'étape VotingSessionStarted  
    * @notice change le workflow à l'étape VotingSessionEnded
     */
    function endVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }

    /**
    * @dev tallyVotes comptabilise les votes.
    * @notice require pour vérifier que le workflow est à l'étape VotingSessionEnded
    * @notice change le workflow à l'étape VotesTallied
    * @notice parcours le tableau des propositions pour trouver la proposition gagnante
    * @notice enregistre l'id de la proposition gagnante
    * @notice _winningProposalId id de la proposition gagnante
     */
    function tallyVotes() external onlyOwner {
       require(workflowStatus == WorkflowStatus.VotingSessionEnded, "Current status is not voting session ended");
       uint _winningProposalId;
      for (uint256 p = 0; p < proposalsArray.length; p++) {
           if (proposalsArray[p].voteCount > proposalsArray[_winningProposalId].voteCount) {
               _winningProposalId = p;
          }
       }
       winningProposalID = _winningProposalId;
       
    /**
    * @notice change le workflow à l'étape VotesTallied
    * @param WorkflowStatusChange change le workflow à l'étape VotesTallied
    */
       workflowStatus = WorkflowStatus.VotesTallied;
       emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }
}