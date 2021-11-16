<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ucd extends MY_Controller {

    public function system()
    {
        $this->load->template('v2/ucd/ucd-system-wallet');
    }

    public function doit()
    {
        $this->load->template('v2/ucd/ucd-doit-wallet');
    }

    public function user()
    {
        $this->load->template('v2/ucd/ucd-member-wallet');
    }

    public function pending()
    {
        $this->load->template('v2/ucd/ucd-pending-wallet');
    }

    public function charge()
    {
        $this->load->template('v2/ucd/ucd-charge-list');
    }

    public function create($Route = "")
    {
        switch ($Route) {
            case "member":
                $this->load->template('v2/ucd/ucd-create-member');
                break;
            case "doit":
                $this->load->template('v2/ucd/ucd-create-doit');
                break;
        }
    }

}


